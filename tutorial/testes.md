# Passo a passo para começar com testes

## O que é um caso de uso?

Caso de uso é um orquestrador de chamadas

Por exemplo: um caso de uso não está preocupado em como eu vou apagar um registro - se é em um banco relacional, não-relacional, file, excel, ele só chama a execução dessa tarefa

## Como posso começar com os testes?

1. Criar um diretório testes/usecase
2. Criar um arquivo com o nome do **usecase+spec.ts** ou usecase+spec.js

3. Criar a estrutura básica do teste:

``` ts
describe('nomeDoUseCase', () => {
   it('should <o que voce vai testar>', () => {
      
   });
});
```
4. Criar uma instância da classe que você quer testar **DENTRO DO TESTE**:

``` ts
describe('nomeDoUseCase', () => {
   it('should <o que voce vai testar>', () => {
      const checkLastEventStatus = new CheckLastEventStatus();
   });
});
```

---
[RED] No TDD, a "regra" diz que o seu teste deve começar dando erro, seja o código falhando ou problema de build. 
---

5. Criar a classe que você quer testar  **FORA DO TESTE**:

``` ts
class CheckLastEventStatus {}
```

6. Chamar método da classe **DENTRO DO TESTE**:

``` ts
describe('nomeDoUseCase', () => {
   it('should <o que voce vai testar>', async () => {
      const checkLastEventStatus = new CheckLastEventStatus();

      await checkLastEventStatus.perform('any_group_id');
   });
});
```
---
[INFO] 
* Quando você cria um controller, por exemplo, o nome do método é a intenção. Exemplo: **insert()**, **delete()**...
* Quando você está criando um caso de uso, o nome da classe é a intenção. Logo, o nome do método é só para executar. O nome dele pode ser **execute()**, **perfom()**, ....
---

---
[INFO] 
* Em testes unitários, não precisamos nos preocupar em como os dados vão vir, nós usamos um double test
* Exemplo: no método perform, não importa passar um uuid ou uma string como 'any_group_id'
---

7. Criar o método na classe **FORA DO TESTE**: 

``` ts
class CheckLastEventStatus {
   async perform(groupId: string): Promise<void>{}
}
```

8. Criar o expect **DENTRO DO TESTE**: 

``` ts
describe('nomeDoUseCase', () => {
   it('should <o que voce vai testar>', async () => {
      const checkLastEventStatus = new CheckLastEventStatus();

      await checkLastEventStatus.perform('any_group_id');

      // espera que o groupId recebido seja igual ao que foi informado pelo repository  
      expect(loadLastEventRepository.groupId).toBe('any_group_id');                       <--
   });
});
```
---
[INFO] 
* Sempre que tiver um 'repository', significa alguém que obtém dados de alguma fonte de dados
* É uma ponte com alguém de fora
---

9. Criar a instância da classe usada no expect **DENTRO DO TESTE**: 

``` ts
describe('nomeDoUseCase', () => {
   it('should <o que voce vai testar>', async () => {
      const loadLastEventRepository = new LoadLastEventRepository();                   <--
      const checkLastEventStatus = new CheckLastEventStatus();

      await checkLastEventStatus.perform('any_group_id');

      // espera que o groupId recebido seja igual ao que foi informado pelo repository  
      expect(loadLastEventRepository.groupId).toBe('any_group_id');                       
   });
});
```

10. Criar a classe usada no expect **FORA DO TESTE**: 

``` ts
class LoadLastEventRepository {
   groupId?: string;
}
```

---
[INFO] 
* Quando você habilita o modo strict do typescript, a gente precisa dizer para o compilador do ts quando uma variável pode aceitar nulo ou undefined
* Colocando apenas "groupId?: string;" na classe, ela inicializa sem valor, logo undefined
* Para resolver isso, ou você cria um construtor para obrigar a colocar um valor nesse objeto quando ele for construido
* Ou você adiciona uma interrogação, pra dizer que ele é opcional
* Ou faz "groupId: string | undefined;"
---

11. Fazer injeção de dependência na classe CheckLastEventStatus **DENTRO DO TESTE**:

``` ts
describe('nomeDoUseCase', () => {
   it('should <o que voce vai testar>', async () => {
      const loadLastEventRepository = new LoadLastEventRepository();
      const checkLastEventStatus = new CheckLastEventStatus(loadLastEventRepository);        <--

      await checkLastEventStatus.perform('any_group_id');

      // espera que o groupId recebido seja igual ao que foi informado pelo repository  
      expect(loadLastEventRepository.groupId).toBe('any_group_id');
   });
});
```
12. Criar um construtor para a classe CheckLastEventStatus receber uma dependência:

``` ts
class CheckLastEventStatus {  
   constructor(                                                                               <--
      private readonly loadLastEventRepository: LoadLastEventRepository
   ) {}

   async perform(groupId: string): Promise<void> {}
}
```

---
[INFO] 
* Forma de criar o construtor sem sintax sugar:

``` ts
class CheckLastEventStatus {  

   loadLastEventRepository: LoadLastEventRepository
   
   constructor(loadLastEventRepository: LoadLastEventRepository) {
      this.loadLastEventRepository = loadLastEventRepository;
   }
}
```
---

---
[INFO] 
* modificador private: só vai acessar de dentro da classe
* modificador readonly: é uma constante, não pode mudar
---

13. Roda o teste, mesmo sabendo que vai dar erro

14. Ajusta o método perform() para fazer passar o teste -> Code smell: Test Code in Production

``` ts
async perform(groupId: string): Promise<void> {
   this.loadLastEventRepository.groupId = groupId;
}
```
---
[INFO] 
* modificador private: só vai acessar de dentro da classe
* modificador readonly: é uma constante, não pode mudar
---

15. Cria uma interface para a classe LoadLastEventRepository

``` ts
interface ILoadLastEventRepository {
   loadLastEvent: (groupId: string) => Promise<void>;
}
```

---
[INFO] 
* O que é uma interface? é um contrato 
* Quem tiver essa interface deve implementar o método....
---

16. Criar uma classe de mock que implementa a interface ILoadLastEventRepository:

``` ts
class LoadLastEventRepositoryMock implements ILoadLastEventRepository {
   groupId?: string;

   async loadLastEvent(groupId: string): Promise<void> {
      this.groupId = groupId;
   }
}
```

---
[INFO] 
* Double de teste é uma forma que a gente tem de criar uma classe com o mínimo possível
* Preocupado apenas com o input e o output -> não o processamento
* Usar Mock, Stub e Spy
* Mock está s[o preocupado com o input
---

18. Como o setup fica: (com algumas alterações)

``` ts

/* eslint-disable max-classes-per-file */
interface ILoadLastEventRepository {
   loadLastEvent: (groupId: string) => Promise<void>;
}

class LoadLastEventRepository {
   groupId?: string;
}

class LoadLastEventRepositoryMock implements ILoadLastEventRepository {
   groupId?: string;

   async loadLastEvent(groupId: string): Promise<void> {
      this.groupId = groupId;
   }
}

class CheckLastEventStatus {
   constructor(
      private readonly loadLastEventRepository: ILoadLastEventRepository
   ) {}

   async perform(groupId: string): Promise<void> {
      await this.loadLastEventRepository.loadLastEvent(groupId);                 <-
   }
}

describe('CheckLastEventStatus', () => {
   it('should get last event data', async () => {
      // Arranje
      const loadLastEventRepository = new LoadLastEventRepositoryMock();         <-
      const checkLastEventStatus = new CheckLastEventStatus(
         loadLastEventRepository
      );

      // Act
      await checkLastEventStatus.perform('any_group_id');

      // Assert
      expect(loadLastEventRepository.groupId).toBe('any_group_id');
   });
});

```
------------------------------------
