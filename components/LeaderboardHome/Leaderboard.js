import DataTable from 'react-data-table-component';
// A super simple expandable component.{JSON.stringify(data, null, 2)}
const ExpandedComponent = ({ data }) => 

    <div className="p-6 top-border row-child">
    
           
            <div>
            <lable className="font-bold"><b>Submitted by</b></lable>  <a className="float-right" href='#'>Website.com</a>
            <p className="pb-4">@{data.submittedBy}</p>
            <lable className="font-bold"><b>Project name</b></lable> <a className="float-right" href='#'>Discord.com/server</a>
            <p className="pb-4">@{data.name} {data.sname}</p>
            </div>
               

        <lable  className="font-bold">Pitch us your project in a tweet</lable>
        <p>Hi,

            This is {data.sname} calling from XYZ company. Sorry I missed you.

            I was hoping to speak to you about Hyper-Scale. We’ve helped other companies and I think may be able to help you get similar results.

            You can reach me at +91 9999999999 if you’d like to learn more. But I’ll follow up soon. </p>
        <br />
        <a href='#'>View full application</a>
    </div>;

//  Internally, customStyles will deep merges your customStyles with the default styling.
const customStyles = {
    table:{
        style: {
            color: 'white', 
            marginTop: '3.5rem',
            marginBottom: '0.95rem'
        },
    },

    rows: {
        style: {
            minHeight: '72px',
            background:'#FFFFFF',
            border:'0 !important',
            boxShadow: 'rgb(149 157 165 / 20%) 0px 8px 24px',
            position: 'relative',
            width:'calc(100% - 25px)',
            margin:'0.45rem 0.75rem',
            borderRadius:'0.5rem'
        },
    },
    headCells: {
        style: {
            paddingLeft: '8px', 
            paddingRight: '8px',
            fontSize: '0.8rem',
            color:'#000000', 
            marginBottom: '0.5rem'
           
        },
    },
    cells: {
        style: {
            paddingLeft: '8px', 
            paddingRight: '8px',
            color:'#000000',
            fontSize: '1rem',
           
            
        },
    },
};

const columns = [
    {
        name: 'Rank',
        selector: row => row.rank,
    },
    {
        name: 'Short name',
        selector: row => row.sname,
    },
    {
        name: 'Name',
        selector: row => row.name,
    },
    {
        name: 'Submitted by',
        selector: row => row.submittedBy,
    },
    {
        name: 'Date submitted',
        selector: row => row.dateSubmitted,
    },
    {
        name: 'Votes',
      
        cell:() =><lable className="vote-badge">4,210</lable>
    },
];

const data = [
    {
        id: 1,
        rank: '#1',
        sname: '(😀,😀)',
        name: 'CommunityChest',
        submittedBy: 'ChanceTheDev',
        dateSubmitted: '1 day ago'
    },
    {
        id: 2,
        rank: '#2',
        sname: '(❤️,🤖)',
        name: 'DecenDiscord',
        submittedBy: 'MapleLeafMan',
        dateSubmitted: '1 day ago'
    },
]

const Leaderboard = () => {
    return (
        
        <div className='main'>
      <div className="leaderboard-list">
        <div className="flex flex-row">
              <div className="basis-3/4"><h2 className=" text-3xl font-extrabold text-gray-900" >Trending DAOs</h2></div>
             
        </div>
        <div className="dtable">
        <DataTable
            customStyles={customStyles}
            columns={columns}
            data={data}
            expandableRows
            expandableRowsComponent={ExpandedComponent}
            pagination
        />
        </div>
      
</div>
</div>
       
    );
};

export default Leaderboard;