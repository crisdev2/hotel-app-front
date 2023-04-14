import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FC } from 'react';
import styled from '@emotion/styled';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  maxWidth: '90%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  maxHeight: '90%',
  overflowY: 'auto',
};

const StyledModel = styled(Modal)`
  overflow-y: auto;
`

const BasicModal: FC<Props> = (props) => {
  return (
    <div>
      <StyledModel
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {props.title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} component="div">
            {props.children}
          </Typography>
        </Box>
      </StyledModel>
    </div>
  );
}

interface Props {
  title: string
  children?: React.ReactNode | string
  open: boolean
  handleClose: () => void
}

export default BasicModal