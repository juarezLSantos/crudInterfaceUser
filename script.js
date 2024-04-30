const openModal = () => {
  document.getElementById("modal").classList.add("active");
};

const closeModal = () => {
  document.getElementById("modal").classList.remove("active");
};

document
  .getElementById("cadastrarUsuario")
  .addEventListener("click", openModal);

document.getElementById("modalClose").addEventListener("click", closeModal);

const CreateNewUser = () => {
  let listUser = [];

  const nome = document.getElementById("Nome").value;
  const email = document.getElementById("E-mail").value;
  const tel = document.getElementById("Celular").value;
  const cidade = document.getElementById("Cidade").value;
  const id = Math.floor(Math.random() * 100);

  const objUser = {
    nomeUser: nome,
    emailUser: email,
    telUser: tel,
    cidadeUser: cidade,
    idUser: id,
  };

  if (localStorage.getItem("userInfos")) {
    listUser = JSON.parse(localStorage.getItem("userInfos"));
  }

  listUser.push(objUser);
  // console.log(objUser);

  console.log(listUser);

  localStorage.setItem("userInfos", JSON.stringify(objUser));

  closeModal();
};

document.getElementById("saveValue").addEventListener("click", CreateNewUser);

function CarregarUsuario() {
  let listUser = [];

  if (localStorage.getItem("userInfos")) {
    listUser = JSON.parse(localStorage.getItem("userInfos"));
  }

  if (listUser.length === 0) {
    let tabela = document.getElementById("corpo-tabela");

    tabela.innerHTML = `
        <tr>
        <td colspan='5'> Nenhum usuário cadastrado! </td>
        </tr>
        `;
  } else {
    montarTabela(listUser);
  }
}

window.addEventListener("DOMContentLoaded", CarregarUsuario);

function montarTabela(listUser) {
  let tabela = document.getElementById("corpo-tabela");
  let template = "";

  console.log(listUser);
  listUser.forEach((user) => {
    template += `
    <tr>
    <td>${user.nomeUser}</td>
    <td>${user.emailUser}</td>
    <td>${user.telUser}</td>
    <td>${user.cidadeUser}</td>
    <td>
        <button type="button" class="button green">Editar</button>
        <button type="button" class="button red" onclick="deleteUser(${user.idUser})">Excluir</button>
    </td>
</tr>
    `;
  });
  tabela.innerHTML = template;
}

function deleUser(id) {
  alert(id);

  let userList = JSON.parse(localStorage.getItem("userInfos")) || [];
  const findIndex = userList.findIndex((userId) => userId.idUser == id);

  console.log(findIndex);

  if (findIndex !== -1) {
    userList.splice(findIndex, 1);
    localStorage.setItem("userInfos", JSON.stringify(userList));
    window.location.reload();
  }
}
