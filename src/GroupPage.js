import Card from './CardMemory.js';
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

const feedstyle={
    display:'grid',
    gridTemplateColumns:'repeat(4, 1fr)',
    gridAutoRows: '561px',
    margin:'12px',
    gap:'10px'
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
        <div style={{display:"flex", marginBottom: '40px'}}><Tab /><Search /></div>
        <div className='feed' style={feedstyle}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        </div>
        
    </>
    );
}

export default GroupPage;