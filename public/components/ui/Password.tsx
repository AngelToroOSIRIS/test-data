"use client";

import { Progress } from "@nextui-org/react";
import { useEffect, useState } from "react";
import useValidateForm from "@/hooks/useValidateForm";
import InputForm from "@/components/forms/InputForm";
import { cn } from "@/libs/utils";

interface Props {
  mode?: "create" | "update";
  invalidTexts?: string[];
  length?: number;
  callback: (
    data: {
      newPassword: string | number | null;
      newPasswordOther: string | number | null;
    },
    validData: boolean,
  ) => void;
  requirements: {
    minLength?: boolean;
    upperCase?: boolean;
    lowerCase?: boolean;
    chartSpecials?: boolean;
  };
}

const Password = ({
  callback,
  length = 8,
  invalidTexts,
  mode = "create",
  requirements = {},
}: Props) => {
  const [level, setlevel] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const passwordForm = useValidateForm<{
    newPassword: string | number | null;
    newPasswordOther: string | number | null;
  }>([
    {
      name: "newPassword",
      validations: {
        required: "Este campo es obligatorio",
      },
    },
    {
      name: "newPasswordOther",
      validations: {
        required: "Este campo es obligatorio",
      },
    },
  ]);

  function passwordSecurity(
    contrasena: string | number,
    requisitos: {
      minLength?: boolean;
      upperCase?: boolean;
      lowerCase?: boolean;
      chartSpecials?: boolean;
    },
  ): number {
    const password = String(contrasena);
    const nivelesSeguridad = 4;
    let puntajeSeguridad = 0;

    const requisitosMinimos = [
      requisitos.minLength ? password.length >= length : true,
      requisitos.chartSpecials
        ? /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)
        : true,
      requisitos.lowerCase ? /[a-z]/.test(password) : true,
      requisitos.upperCase ? /[A-Z]/.test(password) : true,
    ];

    for (const requisito of requisitosMinimos) {
      if (requisito) {
        puntajeSeguridad++;
      }
    }

    if (contrasena == null) return 0;

    puntajeSeguridad = Math.min(puntajeSeguridad, nivelesSeguridad);
    return puntajeSeguridad;
  }

  useEffect(() => {
    callback(passwordForm.data, passwordForm.validData && level == 4);
    setlevel(
      passwordForm.data.newPassword
        ? passwordSecurity(passwordForm.data.newPassword, requirements)
        : 0,
    );
  }, [passwordForm.data.newPassword, requirements]);

  return (
    <form className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <InputForm
          name="newPassword"
          onChange={passwordForm.setField}
          validations={passwordForm.validators}
          tooltip={{
            icon: "info-circle",
            content: (
              <div>
                <p className="mb-1 text-medium text-primary">Requisitos</p>
                {requirements.minLength && (
                  <p>- Debe tener mínimo {length} caracteres</p>
                )}
                {requirements.upperCase && <p>- Debe tener mayúsculas</p>}
                {requirements.lowerCase && <p>- Debe tener minúsculas</p>}
                {requirements.chartSpecials && (
                  <p>- Debe tener caracteres especiales</p>
                )}
              </div>
            ),
          }}
          label={{
            required: true,
            value: mode == "create" ? "Nueva contraseña:" : "Contraseña",
          }}
          type="password"
          placeholder={
            mode == "create"
              ? "Ingresar nueva contraseña"
              : "Ingrese contraseña"
          }
        />
        <Progress
          size="md"
          aria-label="password..."
          value={
            level !== 0
              ? level !== 4
                ? level !== 1
                  ? level !== 3
                    ? 45
                    : 70
                  : 10
                : 100
              : 0
          }
          classNames={{
            base: "mx-auto",
            track: "border border-default",
            indicator: cn("", {
              "bg-red": level == 1,
              "bg-gradient-to-r from-danger to-success":
                level == 2 || level == 3,
              "bg-green": level == 4,
            }),
            label: "text-default-600",
            value: "text-foreground/60",
          }}
        />
        <p className="ml-2 text-default-500 ">
          Seguridad:{" "}
          <span
            className={cn("", {
              "text-danger": level == 1,
              "text-[#EAAD00]": level == 2 || level == 3,
              "text-success": level == 4,
            })}
          >
            {cn("", {
              "No hay": level == 0,
              Baja: level == 1,
              Media: level == 2 || level == 3,
              Alta: level == 4,
            })}
          </span>
        </p>
        <InputForm
          name="newPasswordOther"
          onChange={passwordForm.setField}
          validations={passwordForm.validators}
          label={{
            required: true,
            value:
              mode == "create"
                ? "Confirmar nueva contraseña:"
                : "Confirmar contraseña",
          }}
          type="password"
          placeholder={
            mode == "create"
              ? "Confirme la nueva contraseña"
              : "Confirme la contraseña"
          }
        />
        {passwordForm.data.newPasswordOther &&
          passwordForm.data.newPassword &&
          passwordForm.data.newPassword !==
            passwordForm.data.newPasswordOther && (
            <p className="text-primary font-medium text-sm ml-1">
              Las contraseñas no son iguales
            </p>
          )}
      </div>
    </form>
  );
};

export default Password;
