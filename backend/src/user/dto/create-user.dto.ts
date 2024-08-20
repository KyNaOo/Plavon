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
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^~()\[\]{}|;:"'<>,./?+=_\\-])[A-Za-z\d@$!%*?&#^~()\[\]{}|;:"'<>,./?+=_\\-]{8,}$/,
    {
      message:
        'Le mot de passe doit contenir au minimum 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre, et un caractère spécial',
    },
  )
  password: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-ZÀ-ÿ'-]+$/, {
    message: 'Nom invalide ou vide',
  })
  lastName: string;
  
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-ZÀ-ÿ'-]+$/, {
    message: 'Prénom invalide ou vide',
  })
  firstName: string;

  @IsString()
  @IsNotEmpty({
    message: 'La bio ne doit pas être vide',
  })
  bio: string;
}
