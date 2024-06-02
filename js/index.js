

var bookNameInput = document.getElementById('bookName');
var webUrlInput = document.getElementById('webUrl');
var subBtnInput = document.getElementById('subBtn');
var updateBtnInput = document.getElementById('updateBtn');
var linksContainer = [];
var updateIndex;

if(localStorage.getItem("link") !== null){
    linksContainer = JSON.parse(localStorage.getItem("link"));  // if there is no data in local storage
    displayLinks();
}
function addSubmit()
{
    var link = {
        code:bookNameInput.value,
        url:webUrlInput.value,         //Object
    }

    linksContainer.push(link);  
    clearForm();
    localStorage.setItem("link",JSON.stringify(linksContainer)) ;     // save the array to
    displayLinks();
    // console.log(linksContainer);
}

function clearForm()
{
    bookNameInput.value = null;
    webUrlInput.value = null;
}

function displayLinks()
{
    var cartoona = ``;
    for(var i=0; i<linksContainer.length;i++)
    {
        cartoona += `<tr>
        <td>${(i+1)}</td>
        <td>${linksContainer[i].code}</td>
        <td><a href="${linksContainer[i].url}" target="_blank" class="btn bg-success text-white pe-2"><i class="fa-solid fa-eye pe-2"></i>Visit</a>
        </td>
        <td>
            <button onclick="setFormForUpdate(${i});" class="btn bg-warning text-white pe-2"><i class="fa-solid fa-pen-to-square pe-1"></i>Update</button>
        </td>
        <td>
            <button onclick="deleteLinks(${i});" class="btn bg-danger text-white pe-2"><i class="fa-solid fa-trash-can pe-1"></i>Delete</button>
        </td>
    </tr>`
    }
    document.getElementById('tableBody').innerHTML = cartoona;
    
}

function visit()
{
    webUrlInput.value
    window.open(webUrlInput.value,  "_blank");
}

function deleteLinks(deleteIndex)
{
    linksContainer.splice(deleteIndex,1); 
    displayLinks();
    localStorage.setItem("link",JSON.stringify(linksContainer)) ;
}

// var updateIndex;   =>   //  global variable to store the index of link which needs to be updated in array
function setFormForUpdate(i)
{
    updateIndex = i;
    subBtn.classList.add('d-none');
    updateBtn.classList.remove('d-none');
    bookNameInput.value = linksContainer[i].code;
    webUrlInput.value = linksContainer[i].url;
}

function updateLink()
{
    subBtn.classList.remove('d-none');
    updateBtn.classList.add('d-none');
    linksContainer[updateIndex].code = bookNameInput.value;
    linksContainer[updateIndex].url = webUrlInput.value;
    displayLinks();
    localStorage.setItem("link",JSON.stringify(linksContainer)); 
    clearForm();
}

function validateInput(element)
{

    var regex = {
        bookName:/^[A-z][a-z]{2,8}$/,
        webUrl:/^(http|https)/
    }
    if(regex[element.id].test(element.value) == true)
    {
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
        return true;
    }
    else
    {
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
        return false;
    }
}









