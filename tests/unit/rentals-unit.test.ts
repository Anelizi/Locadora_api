import rentalsService from "../../src/services/rentals-service";
import rentalsRepository from "../../src/repositories/rentals-repository";
import { faker } from "@faker-js/faker";
import { User } from "@prisma/client";
import prisma from "../../src/database";

type UserInput = Omit<User, "id" | "rentals">;

export async function buildUser(adult = true) {
  const data: UserInput = buildUserInput(adult);
  return await prisma.user.create({ data });
}

export function buildUserInput(adult: boolean) {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    birthDate: generateBirthdate(adult),
    cpf: faker.internet.ipv4().replace(/\.$/g, ''),
  }
}

function generateBirthdate(adult: boolean) {
  return adult ?
    faker.date.birthdate({ min: 18, mode: "age" }) :
    faker.date.birthdate({ min: 10, max: 16, mode: "age" })
}

function generateValue(min: number, max: number){
  return Math.floor(Math.random() * (max - min + 1) + min);
}

describe("Rentals Service Unit Tests", () => {
	beforeEach(() => {
	  jest.clearAllMocks();
	});

	it("should return rentals", async () => {
	  jest.spyOn(rentalsRepository, "getRentals").mockResolvedValueOnce([
	    { id: 1, closed: false, date: new Date(), endDate: new Date(), userId: 1 },
	    { id: 2, closed: false, date: new Date(), endDate: new Date(), userId: 1 }
	  ]);
	
	  const rentals = await rentalsService.getRentals();
	  expect(rentals).toHaveLength(2);
	});

  it("should allow renting from 1 to 4 movies", async () => {
   
  })

})