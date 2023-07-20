import rentalsService from "../../src/services/rentals-service";
import rentalsRepository from "../../src/repositories/rentals-repository";
import { faker } from "@faker-js/faker";
import { User } from "@prisma/client";
import prisma from "../../src/database";
import { buildRentalReturn } from "../factories/rental-factory";

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
});
