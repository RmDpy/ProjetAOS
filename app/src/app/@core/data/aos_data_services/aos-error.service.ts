import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AosErrorService {

 onTriggeringAlert(problemStatus, problemMessage): object {
    var alert = {status: problemStatus, text: problemMessage};
    return alert;
  }

  errorHandler(type: Number, message: String): object {
    switch(type) { 
      case 400: { 
        return this.onTriggeringAlert('danger', 'Erreur '+type+' ('+message+') - Ils manquent des données nécéssaires pour cette opération.');
      } 
      case 401: { 
        return this.onTriggeringAlert('danger', 'Erreur '+type+' ('+message+') - Vous n\'avez pas (ou plus) le droit d\'effectuer cette opération.');
      }
      case 403: { 
        return this.onTriggeringAlert('danger', 'Erreur '+type+' ('+message+') - Cette opération est actuellement interdite.');
      }
      case 404: { 
        return this.onTriggeringAlert('danger', 'Erreur '+type+' ('+message+') - La cible de cette opération est introuvable ou n\'existe plus.');
      }
      case 500: { 
        return this.onTriggeringAlert('danger', 'Erreur '+type+' ('+message+') - Le serveur ne répond plus, veuillez réessayer ultérieurement.');
      }
      case 418: { 
        return this.onTriggeringAlert('danger', 'Erreur '+type+' (Custom Error) - ' + message); //Les alertes customs hors HTTP res de l'application
      }         
      default: { 
        return this.onTriggeringAlert('danger', 'Erreur '+type+' ('+message+' | API ou APP inactive ?) - Une erreur est survenue, réessayer ultérieurement.');
      } 
    } 
  }
}
