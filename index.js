import express from "express";
 
const app = express();
 
app.use(express.json());
 
let listaTarefas = [];
function acharIndexPeloId(id){
    let index = 0;
    let deuporra = false;
    listaTarefas.forEach(u=>{
        if(u.id === id){
            deuporra = true;
            return;
        }
        index++;
    });

    if(deuporra){
        return index;
    }else{
        return -1;
    }
}
function verLista(verSomente_naoConcluidas){
    let string = "";
    listaTarefas.forEach(u=>{   
        if(verSomente_naoConcluidas == 1){
            if(u.concluido == false){
                string += `id: ${u.id} | data: ${u.data} | concluido : ${u.concluido} | descricao: ${u.descricao}`;
            }
        }else{
            string += `id: ${u.id} | data: ${u.data} | concluido : ${u.concluido} | descricao: ${u.descricao}`;
        }  
    });
    return string;
}

app.post("/API/adicionarTarefa", (req, res) => {
    const id = Number(req.body.id);
    const descricao = req.body.descricao;
    const data = req.body.data;
    const concluido = Boolean(req.body.concluido);

    // console.log(listaTarefas.length);
    
    let index = acharIndexPeloId(id);
    if(index == -1){
        res.send({message : "tarefa criada!"});
        listaTarefas.push({
            "id":id, 
            "descricao":descricao, 
            "data":data, 
            "concluido":concluido
        });
    }else{
        console.log(`Ja existe esse id: ${id}`);
        res.send({message : `Ja existe esse id: ${id}`});
    }
});
 
app.get("/API/verLista", (req, res) => {
    const naoConcluidas = Number(req.query.naoConcluidas); //query

    res.send({message : verLista(naoConcluidas)});
});

app.put("/API/mudarTarefa", (req, res) => {
    const id = Number(req.body.id);
    const descricao = req.body.descricao;
    const data = req.body.data;
    const concluido = Boolean(req.body.concluido);

    let index = acharIndexPeloId(id);
    if(index == -1){
        res.send({message : "nao tem id dessa tarefa!"});
    }else{
        listaTarefas[index] = {
            "id":id, 
            "descricao":descricao, 
            "data":data, 
            "concluido":concluido
        };
        res.send({message : `tarefa mudada: ${id}`});
    }
});
 
app.delete("/API/deletarTarefa", (req, res) => {
    const id = Number(req.body.id);

    let index = acharIndexPeloId(id);
    if(index == -1){
        res.send({message : "nao tem id dessa tarefa!"});

    }else{
        listaTarefas.splice(index, 1);
        res.send({message : `tarefa deletada: ${id}`});
    }
});
 
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});


/*
{
    "id":1, 
    "descricao":"fds", 
    "data":"10/10/2010", 
    "concluido":true
}
*/