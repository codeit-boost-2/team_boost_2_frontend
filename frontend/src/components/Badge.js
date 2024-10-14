

function Badge({ badgeName }){
    if(badgeName === "공감왕"){
        return(
            <div>
                💐공감왕!
            </div>
        );
    }
    else if(badgeName === "추억왕"){
        return(
            <div>
                📚추억왕!
            </div>
        );
    }
    else if(badgeName === "어르신"){
        return(
            <div>
                👵어르신!
            </div>
        );
    }
    else{
        return
    }
}

export default Badge;