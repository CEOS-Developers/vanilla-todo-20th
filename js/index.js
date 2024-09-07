document.addEventListener('DOMContentLoaded', () => {
  // Set title date.
  const titleElement = document.getElementById('title');
  titleElement.innerText = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());

  // Init kanban board
  const taskViewModel = new TaskViewModel();
  const subjectViewModel = new SubjectViewModel(taskViewModel);

  subjectViewModel.render();
});
