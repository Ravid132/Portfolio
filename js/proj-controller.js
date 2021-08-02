'use strict'

$(document).ready(initPage);

function initPage() {
    var projects = createProjects();
    renderProjs(projects);
}

function renderProjs(projs) {
    var strHTMLs = projs.map(function (proj) {
        return `
        <div class="col-md-4 col-sm-6 portfolio-item">
            <a class="portfolio-link" data-toggle="modal" data-id="${proj.id}" href="#portfolioModal">
                <div class="portfolio-hover">
                    <div class="portfolio-hover-content">
                        <i class="fa fa-plus fa-3x"></i>
                    </div>
                </div>
                 <img class="img-fluid" src="${proj.img}" >
            </a>
            <div class="portfolio-caption">
                <h4>${proj.name}</h4>
                <p class="text-muted">${proj.title}</p>
            </div>
        </div>
        `
    });
    document.querySelector('.projects').innerHTML = strHTMLs.join('');
}

{/* <img class="img-fluid" src="img/portfolio/${proj.name}.jpg" > */ }