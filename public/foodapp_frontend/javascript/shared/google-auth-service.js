let loginCheck = () => JSON.parse(window.sessionStorage.getItem("userId"));

let setCookie = (key, value) => document.cookie = `${key}=${value}`;

let loginOrRegister = () => {
  if (!loginCheck()) {
    setCookie('jwt', '')
    let url = new URL(window.location.href);
    let id_token = url.searchParams.get('id_token');
    let access_token = url.searchParams.get('access_token');
    if (id_token && access_token) {
      $.ajax({
        url: `http://localhost:1337/auth/google/callback?id_token=${id_token}&access_token=${access_token}`,
        type: "GET",
        success: (result) => {
          setCookie('jwt', result.jwt);
          window.sessionStorage.setItem("userId", result.user.id);
          getCartDetails().then(cartDetails => {
            if (!cartDetails[0]) createCart();
          })
        },
        error: (error) => {
          console.error(error)
          reject("Login/Registration failed")
        }
      })
    }
  }
}

let signOut = () => {
  setCookie('jwt', '');
  sessionStorage.clear();
  console.log('Successfully signed out')
}

loginOrRegister();