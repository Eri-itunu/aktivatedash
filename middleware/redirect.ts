// middleware/redirectToDefaultRoute.js
export default function ({ route, redirect }) {
    // Check if the current route is the root route '/'
    if (route.path === '/') {
      // Redirect to your desired default route
      redirect('/your-default-route');
    }
  }