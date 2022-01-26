Caso de uso: função não está preocupado em como eu vou apagar um registro - se é em um banco relacional, não-relacional, file, excel ...
Ele é um orquestrador de chamadas

Função de "obter os dados do grupo do evento a ser removido" será delegado para um outro componente:

1. Começar criando a instância da classe que eu vou testar no teste

-> vai dar um erro porque não temos essa classe ainda

2. Então, você para o teste e declara essa classe

-> voltando ao teste, padrão 3A: 
Arrange, act, assert

-> comum que tenha muitas dependencias, então
por convenção, usar nome sut para a instancia da classe que tu vai testar

3. Nome do método da classe de usecase não é tão importante, porque o nome da classe já deve ser bem descritivo - chamar o método performe da classe sut

4. Ao inves de mandar tipos primitivos no parametro, mandar objetos

5. criar o metodo perform na classe

6. repositorio é alguem que vai buscar dados de algum lugar