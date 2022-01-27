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


``` js
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