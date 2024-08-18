import Card from './Card.js';
import Info from './Info.js';
import Gnb from './Gnb.js';
import Button from './Button.js';
import Tab from './Tab.js';
import Search from './Search.js';
const style={
    margin:'20px',
    display: 'flex',
    fontFamily: 'Spoqa Han Sans Neo, Sans-Serif',
    fontWeight: '600',
    justifyContent:'center',
    alignItems:'center',

};
function GroupPage(){
    return(
    <>
        <Gnb />
        <Info />
        <hr />  
        <div style={style}>
            <div style={{flexGrow:'1', display: 'flex', justifyContent:'center', alignItems:'center'}}>추억목록</div>
            <Button />
        </div>
        
        <div style={{display:"flex"}}><Tab /><Search /></div>
        <Card />
    </>
    );
}

export default GroupPage;