# Anti-Patterns/Code Smells
- Speculative Generality => Supor coisas que precisa sem realmente precisar
- God Class => fazer muita coisa
- Divergente Change => se você está em um componente e precisa mexer nele por mais de um motivo, você está fazendo coisa de mais nele
- Improper Instanciation => Criar instâncias de forma errada
- High Coupling => Quando uma classe cria sua própria dependência
- Test Code in Production
- Acoplamento => se você recebe uma classe concreta, você está acoplado
- Duplicate code
- Shutgum Surgery => quando você mexe em um lugar e afeta vários outros


# Design Patterns/Principles/Conventions
- You Ain't Gonna Need It (YAGNI) => Não faça coisas enquanto você não precisa
- Single Responsability (SRP) => Cada componente com sua responsabilidade
- Arrange, Act, Assert (AAA or Triple A) => { 
   bloco onde vai organizar o teste,
   bloco de ação 
   bloco para testar alguma coisa
}
- Dependency Injection (DI) => tirar a responsabilidade da classe de criar suas dependências
- Dependency inversion (DIP) => usar interfaces na mesma camada onde você precisa de umm componente de fora 
- Liskov Substituition (LSP)
- Repository Pattern
- Test Doubles (Mock)
- Small commits => boa commitar depois do teste passar
- System Under Test (SUT)
