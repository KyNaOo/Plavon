import { IsString, IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class CreateUserDto {
  @IsEmail(
    {},
    {
      message: 'Vous devez entrer un email valide !',
    },
  )
  @IsNotEmpty({
    message: "L'email ne doit pas être vide !",
  })
  email: string;

  @IsString()
  @IsNotEmpty({
    message: 'Le mot de passe ne doit pas être vide !',
  })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'Le mot de passe doit contenir au minimum 8 caractères, 1 majuscule, 1 minuscule et un caractère spécial',
    },
  )
  password: string;

  @IsString()
  @IsNotEmpty({
    message: 'Le prénom ne doit pas être vide',
  })
  @Matches(/^[a-zA-ZÀ-ÿ'-]+$/, {
    message: "Prénom invalide",
  })
  firstName: string;

  @IsString()
  @IsNotEmpty({
    message: 'Le nom ne doit pas être vide',
  })
  @Matches(/^[a-zA-ZÀ-ÿ'-]+$/, {
    message: "Nom invalide",
  })
  lastName: string;

  @IsString()
  @IsNotEmpty({
    message: 'La bio ne doit pas être vide',
  })
  bio: string;
}
