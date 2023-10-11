
import {Table, TableBody, TableCell, 
TableContainer, TableHead, TableRow, 
Paper,Button}                                       from '@mui/material';
import DeleteOutlineOutlinedIcon                    from '@mui/icons-material/DeleteOutlineOutlined';
import PictureAsPdfOutlinedIcon                     from '@mui/icons-material/PictureAsPdfOutlined';
import ArticleOutlinedIcon                          from '@mui/icons-material/ArticleOutlined';
import AttachEmailOutlinedIcon                      from '@mui/icons-material/AttachEmailOutlined';
import GridLoadingButtonDow                         from '../../fastComponents/Girds/GridLoadingButton/GridLoadingButtonDow';
import CancelIcon                                   from '@mui/icons-material/Cancel';

import LoadingButton                                from '../../fastComponents/LoadingButton';
import { useFContext}                               from "../../FacUserProvider";

export default function BasicTable({colums, rows, funcion}) { 
  const fdata   = useFContext();
  return (
    <TableContainer component={Paper}>      
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            {(colums)&&(colums.length > 0)&&
              colums.map((colum, index) => (
                <TableCell key={'col-cell-'+index} align='center'>{colum.value}</TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {(rows.length > 0)?
            rows.map((row, indexR) => (              
              <TableRow key={'t-'+indexR} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                {Object.keys(row).map((key, index) => (
                  (index <= (colums.length-1))&&
                  <TableCell key={'tab-cell-'+index} align='center'>{
                    (row[key] === 'delete')?
                    <Button onClick={()=>{funcion(indexR)}} variant='outlined' color={'info'}  startIcon={<DeleteOutlineOutlinedIcon />}>Quitar</Button>
                    :
                    (row[key] === 'impPDF')?
                    <GridLoadingButtonDow label={''}  click={()=>{}} loading={false} variant={'contained'} icon={(row.pdfBase64 != null && row.pdfBase64 != '')?<PictureAsPdfOutlinedIcon/>:<CancelIcon/>}   color={(row.pdfBase64 != null && row.pdfBase64 != '')?'info':'error'} fullWidth={false} docName={row.uuid+'.pdf'} href={(row.pdfBase64 != null && row.pdfBase64 != '')?'data:image/xml;base64,'+row.pdfBase64:''} size={'medium'}  xs={12} md={2}/>
                    :
                    (row[key] === 'impXML')?
                    <GridLoadingButtonDow label={''}  click={()=>{}} loading={false} variant={'contained'} icon={(row.xmlBase64 != null && row.xmlBase64 != '')?<ArticleOutlinedIcon/>:<CancelIcon/>}   color={(row.xmlBase64 != null && row.xmlBase64 != '')?'info':'error'} fullWidth={false} docName={row.uuid+'.xml'} href={'data:image/xml;base64,'+row.xmlBase64} size={'medium'} xs={12} md={2}/>
                    :
                    (row[key] === 'mail')?
                    <LoadingButton label={''} click={()=>{funcion(row)}} loading={fdata.loading} variant={'contained'} icon={<AttachEmailOutlinedIcon />} color={'info'} fullWidth={false} disabled={false} size={'medium'}/>
                    // <Button onClick={()=>{funcion(row)}} variant='outlined' color={'info'}  startIcon={<AttachEmailOutlinedIcon />}></Button>
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