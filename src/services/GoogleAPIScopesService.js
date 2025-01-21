class GoogleAPIScopesService {

    constructor(){}
    
    getFullCalendarScopes(){
        return ['calendar'];
    }
    getReadCalendarScopes(){
        return ['calendar-read'];
    }
    getEventsCalendarScopes(){
        return ['calendar-events'];
    }
    
    
}

const googleAPIScopesService = new GoogleAPIScopesService();
export default googleAPIScopesService;