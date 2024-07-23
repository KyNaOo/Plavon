import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
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
  password: string;
}
