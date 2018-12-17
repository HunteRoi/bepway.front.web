export class TabsService{
    constructor(readonly tab : string){

    }

    setActive(){
        let div = document.getElementById("tabs");
        let activeTab = div.getElementsByClassName("active")[0];
        if(activeTab != null ) activeTab.classList.toggle("active");
        document.getElementById(this.tab).classList.toggle("active");
    }
}