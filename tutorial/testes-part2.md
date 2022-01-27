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

21. Criar um teste para verificar o status quanto não tem eventos em um grupo

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

22. Criar variável output, trocar retorno para undefined e retornar output

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

23. Mudar nome: de Mock para Spy e em todos os lugares que tiver

``` ts
class LoadLastEventRepositorySpy implements ILoadLastEventRepository {...}
```

---
[⚠️] **INFO:**
* Mock se preocupa apenas com o input. 
* Stub se preocupa apenas com o output. 
* Spy se preocupa tanto com input quanto com output.
---
