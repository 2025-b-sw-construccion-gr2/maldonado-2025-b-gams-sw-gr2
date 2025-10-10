from gams_suma.logicaSuma import sumar
from gams_resta.logicaResta import restar

def main():
    print("=== Calculadora básica ===")

    # Preguntar al usuario qué operación desea realizar
    operacion = input("Ingrese la operación que desea realizar (sumar/restar): ").strip().lower()

    if operacion not in ["sumar", "restar"]:
        print("Operación no válida. Por favor ingrese 'sumar' o 'restar'.")
        return

    # Pedir los números
    try:
        a = float(input("Ingrese el primer número: "))
        b = float(input("Ingrese el segundo número: "))
    except ValueError:
        print("Debes ingresar números válidos.")
        return

    # Realizar la operación seleccionada
    if operacion == "sumar":
        resultado = sumar(a, b)
    else:
        resultado = restar(a, b)

    print(f"Resultado: {resultado}")

if __name__ == "__main__":
    main()
