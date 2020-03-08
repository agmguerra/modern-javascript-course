const data = [
  {
    name: 'John Doe',
    age: 32,
    gender: 'male',
    lookingfor: 'female',
    location: 'Boston',
    image: 'https://randomuser.me/api/portraits/men/82.jpg'
  },
  {
    name: 'William Johnson',
    age: 38,
    gender: 'male',
    lookingfor: 'female',
    location: 'Lynn MA',
    image: 'https://randomuser.me/api/portraits/men/83.jpg'
  },
  {
    name: 'Jen Smith',
    age: 26,
    gender: 'female',
    lookingfor: 'male',
    location: 'Maimi FL',
    image: 'https://randomuser.me/api/portraits/women/82.jpg'
  }
]

const profiles = profileIterator(data);

//Call first profile
nextProfile();

//Next event
document.getElementById('next').addEventListener('click', nextProfile);

//Next profile display
function nextProfile() {
  const curProfile = profiles.next().value;

  if (curProfile !== undefined) {
    document.getElementById('profileDisplay').innerHTML = `
      <ul class="list-group">
        <li class="list-group-item">Neme: ${curProfile.name}</li>
        <li class="list-group-item">Age: ${curProfile.age}</li>
        <li class="list-group-item">Location: ${curProfile.location}</li>
        <li class="list-group-item">Preference: ${curProfile.gender} looking for ${curProfile.lookingfor}</li>
      </ul>
    `;

    document.getElementById('imageDisplay').innerHTML = `
      <img src="${curProfile.image}" alt=""/>
    `;
  } else {
    //No more profiles
    window.location.reload();
  }
}

//Profile Iterator
function profileIterator(profiles) {
  let nextIndex = 0;

  return {
    next: function() {
      return nextIndex < profiles.length ? 
      { value: profiles[nextIndex++], done: false} :
      { done: true }
    }
  }
}