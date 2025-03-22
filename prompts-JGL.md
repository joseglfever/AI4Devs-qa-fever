# Prompts para Creación de Tests E2E con Cypress

**Herramienta de IA:** Cursor + Claude sonnet 3.7 thinking mode

**1.[ask]:** Explícame en detalle en qué consiste este proyecto @codebase. Soy un ingenierio junior por lo que no te dejes ningún detalle. 

**2.[agent]:** Acabamos de clonar el proyecto. Vamos a ejecutar los pasos necesarios para poder ejecutar el proyecto en nuestro sistema. Ya tenemos disponibles las herramientas `npm`, docker compose etc.

**Resultado:** Ha instalado las dependencias necesarias y ha arrancado todos los servidores y servicios necesarios.

**3.[agent]:** En el fichero @README.md  se especifica una forma de introducir posiciones en la base de datos, creo que lo podemos hacer con curl. ¿Lo intentamos?

**Resultado:** Aquí ha empezado a hacer curls a lo loco para ver si ya había algo y se ha puesto a hidratar la base de datos siguiendo la estrategia del seed y usando curl para comprobar los resultados, aunque también ha tirado SQL contra la base de datos. Ha sido entretenido ver cómo lo intentaba de muchas formas hasta conseguirlo, aunque también ha tirado POST con curl

**4.[agent]:** Vale. Ahora nos han encargado crear los tests E2E para verificar los escenarios que puedes ver en la imagen adjunta. Nos exigen hacerlos con cypress. (la imagen adjunta es una captura de pantalla del ejercicio literalmente, ya que al copiar y pegar no mantenía un buen formato)

**Resultado:** Ha instalado Cypress y ha hecho todo lo que ha considerado para hacer las pruebas necesarias incluyendo un caso básico porque no le estaban pasando los tests y quería cerciorarse de que podía pasar al menos un escenario básico. Al final lo ha logrado.

---
## Experimentación adional

**5.[agent]:** Necesito que generes un fichero llamado prompts-JGL.md en la raíz del proyecto en el que especifiques los prompts que te he indicado durante esta conversación, incluído éste, en orden.

**Resultado:** No lo ha conseguido. Solo ha introducido éste último prompt.

**6.[ask]:** No lo has hecho bien. Solo has introducido el prompt que te he escrito. Vamos a repetirlo de la siguiente manera: Repasa toda la conversación desde el principio. Y hazme una lista de todos los mensajes que te he enviado incluyendo éste.

**Resultado:** No lo ha conseguido, pero me ha dado las razones de por qué no puede hacerlo:
> Lo siento por la confusión. Te pido disculpas porque veo que no puedo acceder al texto completo de todos tus mensajes anteriores, solo veo el resumen de la conversación y los mensajes más recientes. Si quieres una lista exacta con todos tus mensajes textuales completos, necesitaría que me proporcionaras esa información.
