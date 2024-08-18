import logo from './assets/logo.jpg';

function Gnb(){
    return(
        <>
        <div style={{marginBottom:'20px', display:'flex', justifyContent:'center',alignItems:'center'}}>
            <img alt='logo' src={logo} ></img>
        </div>
        </>
    );
}

export default Gnb;