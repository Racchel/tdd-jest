> ## Dados
* Id do usuário
* Id do evento de futebol

> ## Fluxo primário
1. Obter os dados do grupo do evento a ser removido
2. Verificar se o usuário que solicitou a exclusão do evento tem permissão (admin ou dono)
3. Remover o evento com o id acima
4. Remover todas as partidas desse evento 

> ## Fluxo alternativo: Não foi encontrado um grupo para o ID do evento informado
1. Retornar erro

> ## Fluxo alternativo: O usuário não pertence ao grupo
1. Retornar erro

> ## Fluxo alternativo: O usuário não tem permissão
1. Retornar erro




