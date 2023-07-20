import rentalsService from "../../src/services/rentals-service";
import rentalsRepository from "../../src/repositories/rentals-repository";
import { faker } from "@faker-js/faker";
import { Rental, User } from "@prisma/client";
import prisma from "../../src/database";
import { buildRentalReturn } from "../factories/rental-factory";
import usersRepository from "repositories/users-repository";
import { buildUserInput } from "../factories/user-factory";

// para limpar todos os mock
beforeEach(() => {
  jest.clearAllMocks();
});

describe("Rentals Service Unit Tests", () => {
  it("should return rentals", async () => {
    // 1 jest.spyOn(rentalsRepository, 'getRentals').mockImplementation(():any => {
    // return [
    //   {
    //     id: 1,
    //     closed: false,
    //     date: new Date(),
    //     endDate: new Date(),
    //     userId: 1
    //   }
    // ]

    // return [buildRentalReturn(1, false), buildRentalReturn(2, false)]
    // })
    //mock 2
    jest
      .spyOn(rentalsRepository, "getRentals")
      .mockResolvedValue([buildRentalReturn(1, false)]);

    // rentalsRepository.getRentals(); // simular o resultado (rentals)

    const rental = await rentalsService.getRentals();
    expect(rental).toHaveLength(1);
  });

  describe("create rentals",() => {
    it("should throw an error when user does not exist",async () => {
      jest.spyOn(usersRepository, 'getById').mockResolvedValue(null);

      const promise = rentalsService.createRental({
        userId: 1,
        moviesId: [1, 2, 3, 4]
      })
      expect(promise).rejects.toEqual({
        name: "NotFoundError",
        message: "User not found."
      })
    })

    it("should throw an error when user already has a rental",async () => {
      const userMock: User = { id: 1, ...buildUserInput(true)}
      const userRental: Rental = buildRentalReturn(1);

      jest.spyOn(usersRepository, 'getById').mockRejectedValue(userMock);
      jest.spyOn(rentalsRepository, 'getRentalById').mockRejectedValue([userRental])

      const promise = rentalsService.createRental({
        userId: userMock.id,
        moviesId: [1]
      });

      expect(promise).rejects.toEqual({
        name: "PendentRentalError",
        message: "The user alresdy have a rental!"
      })

    })
  })
});
