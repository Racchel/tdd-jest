## Como posso começar com os testes? (PART 2)

18. Criar outro expect **DENTRO DO TESTE**: 

``` ts
it('should get last event data', async () => {
   // Arranje
   const loadLastEventRepository = new LoadLastEventRepositoryMock();
   const checkLastEventStatus = new CheckLastEventStatus(
      loadLastEventRepository
   );

   // Act
   await checkLastEventStatus.perform('any_group_id');

   // Assert
   expect(loadLastEventRepository.groupId).toBe('any_group_id');
   // espera que o número de vezes que o repositório for chamado seja igual a 1
   expect(loadLastEventRepository.callsCount).toBe(1);                           <--
});
```

19. Criar variável callsCount no LoadLastEventRepositoryMock **FORA DO TESTE**: 

``` js
class LoadLastEventRepositoryMock implements ILoadLastEventRepository {
   groupId?: string;
   callsCount = 0;

   async loadLastEvent(groupId: string): Promise<void> {
      this.groupId = groupId;
      this.callsCount++;
   }
}
```
20. Seguir padrão SUT **DENTRO DO TESTE**: 


``` ts
it('should get last event data', async () => {
   // Arranje
   const loadLastEventRepository = new LoadLastEventRepositoryMock();
   const sut = new CheckLastEventStatus(loadLastEventRepository);                <--

   // Act
   await sut.perform('any_group_id');

   // Assert
   expect(loadLastEventRepository.groupId).toBe('any_group_id');
   expect(loadLastEventRepository.callsCount).toBe(1);
});
```

21. Criar um teste para verificar o status quanto não tem eventos em um grupo **DENTRO DO TESTE**: 

``` ts
it('should return status done when group has no event', async () => {
   // Arranje
   const loadLastEventRepository = new LoadLastEventRepositoryMock();
   loadLastEventRepository.output = undefined;
   const sut = new CheckLastEventStatus(loadLastEventRepository);

   // Act
   const status = await sut.perform('any_group_id');

   // Assert
   expect(status).toBe('done');
});
```

22. Criar variável output, trocar retorno para undefined e retornar output **FORA DO TESTE**: 

``` ts
interface ILoadLastEventRepository {
   loadLastEvent: (groupId: string) => Promise<undefined>;                       <--
}

class LoadLastEventRepositoryMock implements ILoadLastEventRepository {
   groupId?: string;
   callsCount = 0;
   output: undefined;                                                            <--

   async loadLastEvent(groupId: string): Promise<undefined> {                    <--
      this.groupId = groupId;
      this.callsCount++;
      return this.output;                                                        <--
   }
}
```

23. Mudar nome: de Mock para Spy e em todos os lugares que tiver **FORA DO TESTE**: 

``` ts
class LoadLastEventRepositorySpy implements ILoadLastEventRepository {...}
```

---
[⚠️] **INFO:**
* Mock se preocupa apenas com o input. 
* Stub se preocupa apenas com o output. 
* Spy se preocupa tanto com input quanto com output.
---

24. Mudar tipo de retorno do método perform para string e retornar 'done' **FORA DO TESTE**: 

``` ts
class CheckLastEventStatus {
   constructor(
      private readonly loadLastEventRepository: ILoadLastEventRepository
   ) {}

   async perform(groupId: string): Promise<string> {                             <--
      await this.loadLastEventRepository.loadLastEvent(groupId);
      return 'done';                                                             <--
   }
}
```

25. Testar o código: teoricamente tudo certo

26. [REFACTORY] Criar método factory: makeSut **FORA DO TESTE**: 

``` ts
const makeSut = (): SutTypes => {
   const loadLastEventRepository = new LoadLastEventRepositorySpy();
   const sut = new CheckLastEventStatus(loadLastEventRepository);
   return {
      sut,
      loadLastEventRepository,
   };
};
```

27. Criar type de retorno **FORA DO TESTE**: 

``` ts
type SutTypes = {
   sut: CheckLastEventStatus;
   loadLastEventRepository: LoadLastEventRepositorySpy;
};
```

27. Alterar criacao do SUT e loadLastEventRepository **DENTRO DO TESTE**: 

``` ts
   it('should get last event data', async () => {
      // Arranje
      const { sut, loadLastEventRepository } = makeSut();
      //...
   });

   it('should return status done when group has no event', async () => {
      // Arranje
      const { sut, loadLastEventRepository } = makeSut();
      loadLastEventRepository.output = undefined;
      //...
   });
});
```

28. Instalar mockdate **NO TERMINAL**: 

``` bash
yarn add mockdate -D
```

29. Importar set, reset de mockdate **NO TERMINAL**: 

``` ts
import { set, reset } from 'mockdate';
```

30. Congelar criação da data antes de executar **DENTRO DO TESTE**: 

``` ts
describe('CheckLastEventStatus', () => {
   beforeAll(() => {
      set(new Date())
   });

   afterAll(() => {
      reset()
   })

```

31. Criar uma data ligeiramente a frente do fim do evento **FORA DO TESTE**: 

``` ts
it('should return status active when now is before event end time', async () => {
   // Arranje
   const { sut, loadLastEventRepository } = makeSut();
   loadLastEventRepository.output = {
      endDate: new Date(new Date().getTime() + 1),
   };
```

32. Alterar tipo de retorno da interface **FORA DO TESTE**: 

``` ts
interface ILoadLastEventRepository {
   loadLastEvent: (groupId: string) => Promise<{ endDate: Date } | undefined>;
}
```

33. Alterar tipo de retorno da classe que implementa a interface **FORA DO TESTE**: 

``` ts
class LoadLastEventRepositorySpy implements ILoadLastEventRepository {
   groupId?: string;
   callsCount = 0;   
   output?: { endDate: Date };                                        <--

   async loadLastEvent(
      groupId: string
   ): Promise<{ endDate: Date } | undefined> {                                   <--
      this.groupId = groupId;
      this.callsCount++;
      return this.output;
   }
}
```

34. Alterar expect **DENTRO DO TESTE**: 
```ts
it('should return status active when now is before event end time', async () => {
  
   // Assert
   expect(status).toBe('active');
});
```

35. Alterar o retorno da classe CheckLastEventStatus **FORA DO TESTE**: 

```ts
class CheckLastEventStatus {
   constructor(
      private readonly loadLastEventRepository: ILoadLastEventRepository
   ) {}

   async perform(groupId: string): Promise<string> {
      const event = await this.loadLastEventRepository.loadLastEvent(groupId);
      return event === undefined ? 'done' : 'active';
   }
}
```

36. Trocar todos os 'any_group_id' por um objeto { group_id: 'any_group_id'} **FORA E DENTRO DO TESTE**: 

37. Como ficou o código completo

``` ts
import { set, reset } from 'mockdate';

interface ILoadLastEventRepository {
   loadLastEvent: (input: {
      groupId: string;
   }) => Promise<{ endDate: Date } | undefined>;
}

class LoadLastEventRepository {
   groupId?: string;
}

class LoadLastEventRepositorySpy implements ILoadLastEventRepository {
   groupId?: string;
   callsCount = 0;
   output?: { endDate: Date };

   async loadLastEvent({
      groupId,
   }: {
      groupId: string;
   }): Promise<{ endDate: Date } | undefined> {
      this.groupId = groupId;
      this.callsCount++;
      return this.output;
   }
}

class CheckLastEventStatus {
   constructor(
      private readonly loadLastEventRepository: ILoadLastEventRepository
   ) {}

   async perform({ groupId }: { groupId: string }): Promise<string> {
      const event = await this.loadLastEventRepository.loadLastEvent({
         groupId,
      });
      return event === undefined ? 'done' : 'active';
   }
}

type SutTypes = {
   sut: CheckLastEventStatus;
   loadLastEventRepository: LoadLastEventRepositorySpy;
};

const makeSut = (): SutTypes => {
   const loadLastEventRepository = new LoadLastEventRepositorySpy();
   const sut = new CheckLastEventStatus(loadLastEventRepository);
   return {
      sut,
      loadLastEventRepository,
   };
};

describe('CheckLastEventStatus', () => {
   const groupId = 'any_group_id';

   beforeAll(() => {
      set(new Date());
   });

   afterAll(() => {
      reset;
   });

   it('should get last event data', async () => {
      // Arranje
      const { sut, loadLastEventRepository } = makeSut();

      // Act
      await sut.perform({ groupId: 'any_group_id' });

      // Assert
      expect(loadLastEventRepository.groupId).toBe(groupId);
      expect(loadLastEventRepository.callsCount).toBe(1);
   });

   it('should return status done when group has no event', async () => {
      // Arranje
      const { sut, loadLastEventRepository } = makeSut();
      loadLastEventRepository.output = undefined;

      // Act
      const status = await sut.perform({ groupId });

      // Assert
      expect(status).toBe('done');
   });

   it('should return status active when now is before event end time', async () => {
      // Arranje
      const { sut, loadLastEventRepository } = makeSut();
      loadLastEventRepository.output = {
         endDate: new Date(new Date().getTime() + 1),
      };

      // Act
      const status = await sut.perform({ groupId });

      // Assert
      expect(status).toBe('active');
   });
});

```