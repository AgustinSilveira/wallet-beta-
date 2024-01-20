import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnDestroy {

  

  email: string = '';
  password: string = '';

  errorMessages: string[] = [];
  private errorSubscription: Subscription;


  constructor(
    private authService: AuthService,) {
     // Suscribirse a los mensajes de error
     this.errorSubscription = authService.error$.subscribe(errorMessage => {
      this.errorMessages.push(errorMessage);
    });
   }
  
login() {
  // Llama al método de inicio de sesión en tu servicio de autenticación
  this.authService.signIn(this.email, this.password, null)
    .then((user) => {
      // Imprime la información del usuario en la consola
      console.log('Usuario autenticado:');
    })
    .catch((error) => {
      console.error('Error al iniciar sesión con Facebook:', error);
    });
}




  signInWithGoogle(): void {
    this.authService.signInGoogle();
  }

  signInWithFacebook(): void {
    // Limpiar mensajes de error al intentar iniciar sesión de nuevo
    this.errorMessages = [];
    this.authService.signInWithFacebook();
  }

  ngOnDestroy(): void {
    // Desuscribirse al destruir el componente
    this.errorSubscription.unsubscribe();
  }

}
