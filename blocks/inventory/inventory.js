
// v1 as "auto block"


import { getMetadata } from '../../scripts/aem.js';
import { createOptimizedPicture } from '../../scripts/aem.js';


/*
CONTENT SAMPLE :

<div>
  <h1> Nos véhicules neufs en stock
  <h2> Plus de 2000 véhicules disponibles
  <UL>
    <li> Tous les modèles </li>
    <li> juke=200 </li>
    <li> aria=100 </li>
  </ul>

  <a href="https:///wwwww">Voir les véhicules</a>

<div>
*/



export default async function decorate(block) {
  // const blockMeta = getMetadata('footer');

  console.log("BLOCK INVENTORY");

  const div = document.createElement('div');
  div.className = 'inventory';
  //div.id = "static_inventory_id";
  // div.setAttribute('class', 'inventory');

  let html = '';

  let picture = block.getElementsByTagName('picture');
  if (picture && picture.length > 0) {
     html += picture[0].outerHTML;
  }

  let h1 = block.getElementsByTagName('h1');
  if (h1 && h1.length > 0) {
    html += `<h1>${h1[0].innerText}</h1>`;
  }

  let h2 = block.getElementsByTagName('h2');
  if (h2 && h2.length > 0) {
    html += `<h2>${h2[0].innerText}</h2>`;
  }

  html += `<div class="inventory-select-wrapper">`;

  let uls = block.getElementsByTagName('ul');
  if (uls && uls.length > 0) {
    let ul = uls[0];
    html += `<p><select class="inventory-model-selector">`;
    ul.querySelectorAll('li').forEach((li) => {
      let regex = /^(\w+)=(\w+)(=(\d+))?$/;
      let match = regex.exec(li.innerText);
      if (match) {
        const id = match[1];
        const name = match[2];
        const count = match[4];
        html += `<option id="${id}">${name} ${ count ? '(' + count + ")" : ""} </option>`;
      }
      else {
        html += `<option id="">${li.innerText}</option>`;
      }
    });
    html += "</select>";
  }

  let link = block.getElementsByTagName('a');
  if (link && link.length > 0) {
    html += `<a href="${link[0].href}" class="button"> ${link[0].innerText}</a>`;
  }

  html += "</div>";

  div.innerHTML = html;

  block.innerHTML = ''
  block.append(div);

}
