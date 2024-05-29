
import {Table, TableBody, TableCell, 
TableContainer, TableHead, TableRow, 
Paper,Button, IconButton,Typography }               from '@mui/material';
import { useFContext}                               from "../../FacUserProvider";
export default function BasicTable({colums, rows, funcion}) { 
  const fdata   = useFContext();
  return (
    <TableContainer component={Paper} >      
      <Table sx={{ minWidth: '1138px', borderRadius: '10px', border: '1px solid var(--interface-gray-300, #E0E0E0)'}} aria-label='simple table'>
        <TableHead>
          <TableRow>
            {(colums)&&(colums.length > 0)&&
              colums.map((colum, index) => (
                <TableCell key={'col-cell-'+index} align='center'><b>{colum.value}</b></TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {(rows.length > 0)?
            rows.map((row, indexR) => (              
              <TableRow key={'t-'+indexR} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} disabled={true}>
                {Object.keys(row).map((key, index) => (
                  (index <= (colums.length-1))&&
                  <TableCell key={'tab-cell-'+index} align='center'>{
                    (row[key] === 'delete')?
                      <Button onClick={()=>{funcion(indexR)}} fullWidth={false} variant='outlined' color={'error'} disabled={fdata.loading}
                      sx={{borderRadius : '24px', height: '44px', padding: '12px 31px',justifyContent: 'center',alignItems: 'center',
                        flexShrink: '0',
                        textTransform: 'none',
                        background: 'none',
                        boxShadow: 'none',
                        textTransform: 'none',
                        borderColor: '#ED1E24',
                        '&:hover': {
                          backgroundColor: 'none',
                          borderColor: 'none',
                          boxShadow: 'none',
                        },
                        '&:active': {
                          boxShadow: 'none',
                          backgroundColor:'none',
                          borderColor: 'none',
                        },
                        '&:focus': {
                          boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.10)',
                        },
                      }}
                      > <Typography sx={{color:'#ED1E24', fontSize: '17px'}} >Eliminar</Typography> 
                      </Button>
                    :
                    (row[key] === 'impPDF')?
                      <a download={row.uuid+'.pdf'} href={(row.pdfBase64 != null && row.pdfBase64 != '')?'data:image/xml;base64,'+row.pdfBase64:''}>
                        <img id="Icon_download" src="/Icon_download.png" alt={'Icon_download'} loading='lazy'/>
                      </a>
                    :
                    (row[key] === 'impXML')?
                      <a download={row.uuid+'.xml'} href={(row.pdfBase64 != null && row.pdfBase64 != '')?'data:image/xml;base64,'+row.xmlBase64:''}>
                        <img id="Icon_download" src="/Icon_download.png" alt={'Icon_download'} loading='lazy'/>
                      </a>
                    :
                    (row[key] === 'mail')?
                      <IconButton color={'error'} onClick={()=>{funcion(row)}} disabled={fdata.loading}><img id="icon_mail" src="/icon_mail.png" alt={'icon_mail'} loading='lazy'/></IconButton>
                    :
                    row[key]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          :
            <TableRow key={'sinionfo'} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell align='center'>No se encontraron registros</TableCell>
            </TableRow>
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}