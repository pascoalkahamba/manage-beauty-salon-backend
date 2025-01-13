import { UserModel } from "../@types";
import { UserErrors } from "../errors/user.errors";
import { prismaService } from "../services/prisma.service";
const regepEmail =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
export class UserValidator {
  async validate(user: UserModel) {
    if (user.name.length === 0) throw UserErrors.invalidName();
    if (!regepEmail.test(user.email)) throw UserErrors.invalidEmail();
    if (user.password.length <= 5) throw UserErrors.tooShortPassword();

    const userExists = await prismaService.prisma.user.findFirst({
      where: { email: user.email },
    });

    if (userExists) throw UserErrors.userEmailExists();
  }
}
