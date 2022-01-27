# Anti-Patterns/Code Smells

<details>
  <summary>Speculative Generality</summary>
   
   - Supor coisas que precisa sem realmente precisar
</details>

<details>
  <summary>God Class</summary>
   
   - Fazer muita coisa
</details>

<details>
  <summary>Divergente Change</summary>
   
   - Se você está em um componente e precisa mexer nele por mais de um motivo, você está fazendo coisa de mais nele
</details>

<details>
  <summary>Improper Instanciation </summary>
   
   - Criar instâncias de forma errada
</details>

<details>
  <summary>High Coupling </summary>
   
   - Quando uma classe cria sua própria dependência
</details>

<details>
  <summary>Test Code in Production </summary>
   
   - 
</details>

<details>
  <summary>Acoplamento</summary>
   
   - Quando você recebe uma classe concreta, você está acoplado
</details>

<details>
  <summary>Duplicate code </summary>
   
   - 
</details>

<details>
  <summary>Shutgum Surgery </summary>
   
   - Quando você mexe em um lugar e afeta vários outros
</details>

<details>
  <summary>Long Parameter List </summary>
   
   - 
</details>
<summary>Primitive Obsession </summary>
   
   - 
</details>
<summary>Bad Naming </summary>
   
   - 
</details>

# Design Patterns/Principles/Conventions

<details>
  <summary>Fazer o mínimo para o teste passar</summary>
   
   - 
</details>

<details>
  <summary>You Ain't Gonna Need It (YAGNI) </summary>
   
   - Não faça coisas enquanto você não precisa
</details>

<details>
  <summary>Single Responsability (SRP) </summary>
   
   - Cada componente com sua responsabilidade
</details>

<details>
  <summary>Arrange, Act, Assert (AAA or Triple A)</summary>
   
   - bloco onde vai organizar o teste
   
   - bloco de ação
   
   - bloco para testar alguma coisa
</details>

<details>
  <summary>Dependency Injection (DI)</summary>
   
   - Tirar a responsabilidade da classe de criar suas dependências
</details>

<details>
  <summary>Dependency inversion (DIP)</summary>
   
   - Usar interfaces na mesma camada onde você precisa de umm componente de fora 
</details>

<details>
  <summary>Liskov Substituition (LSP)</summary>
   
   - Objetos podem ser substituídos por seus subtipos sem que isso afete a execução correta do programa
   - Permite que você coloque implementações diferentes
</details>

<details>
  <summary>Repository Pattern</summary>
   
   - 
</details>

<details>
  <summary>Test Doubles (Mock, Stub, Spy)</summary>
   
   - 
</details>

<details>
  <summary>Small commits</summary>
   
   - É uma  boa commitar depois do teste passar
</details>

<details>
  <summary>System Under Test (SUT)</summary>
   
   - Chamar a instância da classe que você está testando de SUT
</details>

<details>
  <summary>Factory Pattern </summary>
   
   - Criar instâncias de objetos complexos, para não precisar repetir em vários lugares diferentes do código
</details>

<details>
  <summary>Strategy Pattern </summary>
   
   - Design Pattern: abrir possibilidades diferentes
   - Ex: Usando o mesmo caso de uso, posso usar o Mongo, ou Postgres ou com os dois
</details>

<details>
  <summary>Clean Code</summary>
   
   -
</details>