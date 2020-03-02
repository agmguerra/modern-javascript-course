//Init Github
const github = new Github();

//Init UI
const ui = new UI();

//Search input
const searchUser = document.getElementById('searchUser');

//Search input evetn listener
searchUser.addEventListener('keyup', (e) => {
  //Get input text
  const userText = e.target.value;
  if (userText !== '') {
    github.getUser(userText)
    .then(data => {
      if (data.profile.message === 'Not Found') {
        ui.showAlert('User not found', 'alert alert-danger');
      } else {
        ui.showProfile(data.profile);
        if (!data.repos.message) {
          ui.showRepos(repos);
        }
      }
      
    })
    
  } else {
    ui.clearProfile();
  }
})