console.log('Starting up');


function onSubmitMail(ev) {
    ev.preventDefault();
    var email = document.querySelector('#email').value;
    var subject = document.querySelector('#email-subject').value;
    var body = document.querySelector('#text-area-body').value;

    window.location.href = `https://mail.google.com/mail/?view=cm&fs=1&to=ravidha132@gmail.com&su=${subject}&body=${body}`
}

//modal open
$('#portfolioModal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget);
    var id = button.data('id');
    var project = getProjById(id);

    var currModal = $(this);
    currModal.find('.modal-body h2').text(project.name);
    currModal.find('.modal-body .item-intro').text(project.title);
    currModal.find('.modal-body .desc').text(project.desc);
    currModal.find('.modal-body img').attr('src', project.img);
    currModal.find('.modal-body .project-link').attr('href', project.url);

    var date = new Date(project.publishedAt);
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDay();

    var fullDate = day + '/' + month + '/' + year;
    currModal.find('.modal-body .date').text('Date: ' + fullDate);
    currModal.find('.modal-body .category').text('Category: ' + project.labels);


})