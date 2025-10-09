import { MigrationInterface, QueryRunner } from "typeorm";
import * as bcrypt from "bcrypt";

export class HashPasswordMigration1760052148210 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Obtener todos los usuarios
    const users: { id: string; password: string }[] = await queryRunner.query(`
      SELECT id, password FROM "users";
    `);

    for (const user of users) {
      // Verificar si la contraseña ya está hasheada (empieza con $2b$ o $2a$)
      if (!user.password.startsWith("$2b$") && !user.password.startsWith("$2a$")) {
        const hashedPassword = await bcrypt.hash(user.password, 10);

        await queryRunner.query(
          `UPDATE "users" SET password = $1 WHERE id = $2;`,
          [hashedPassword, user.id]
        );
      }
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // No es posible revertir el hash sin conocer las contraseñas originales.
    // Solo documentamos la acción.
    console.log("Down migration: No se pueden revertir los hashes de contraseña.");
  }
}
