// import { useEffect, useState } from 'react';
// import { useFetchPlans } from '../../api/PlansApi';
// import { Card, CardActionArea, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Typography } from '@mui/material';
// import HighlightOffIcon from '@mui/icons-material/HighlightOff';
// import styles from './index.module.css';
// import { red } from '@mui/material/colors';
// import { Link } from 'react-router-dom';
// import { PlanType } from '../../types/types';

// function Plans() {
//   const { data, isFetched, isLoading, isError } = useFetchPlans();

//   const [filteredPlans, setFilteredPlans] = useState<PlanType[]>(data);

//   const [selectedMetodology, setSelectedMetodology] = useState<string>('');
//   const [selectedFrequency, setSelectedFrequency] = useState<string>('');
//   const [selectedModality, setSelectedModality] = useState<string>('');

//   useEffect(() => {
//     let filtered = data;

//     if (selectedMetodology) {
//       filtered = filtered.filter((plan: PlanType) => plan.metodology === selectedMetodology);
//     }

//     if (selectedFrequency) {
//       filtered = filtered.filter((plan: PlanType) => plan.frequency === selectedFrequency);
//     }

//     if (selectedModality) {
//       filtered = filtered.filter((plan: PlanType) => plan.modality === selectedModality);
//     }

//     setFilteredPlans(filtered);

//   }, [data, selectedFrequency, selectedMetodology, selectedModality]);

//   console.log(data, isFetched, isLoading, isError);

//   const uniqueModalities: string[] = data?.length && data?.reduce((acc: string[], plan: PlanType) => {
//     if (!acc.includes(plan.metodology)) {
//       acc.push(plan.metodology);
//     }
//     return acc;
//   }, []);


//   const uniqueFrequencies: string[] = data?.length && data?.reduce((acc: string[], plan: PlanType) => {
//     if (!acc.includes(plan.frequency)) {
//       acc.push(plan.frequency);
//     }
//     return acc;
//   }, []);

//   const uniqueTypes: string[] = data?.length && data?.reduce((acc: string[], plan: PlanType) => {
//     if (!acc.includes(plan.modality)) {
//       acc.push(plan.modality);
//     }
//     return acc;
//   }, []);

//   const clearMetodology = () => {
//     setSelectedMetodology('');
//   };

//   const clearFrequency = () => {
//     setSelectedFrequency('');
//   };

//   const clearType = () => {
//     setSelectedModality('');
//   };

//   const getTypeText = (type: string): string => {
//     switch (type) {
//       case 'uma modalidade':
//         return '1MOD.';
//       case 'two':
//         return '2MOD.';
//       case 'three':
//         return '3MOD.';
//       default:
//         return '';
//     }
//   };

//   const getModalityColor = (modality: string): string => {
//     return modality === 'online' ? red[50] : red[100];
//   };

//   const getFrequencyColor = (frequency: string): string => {
//     switch (frequency) {
//       case 'mensal':
//         return '#FFED00';
//       case 'trimestral':
//         return '#FFBD59';
//       case 'semestral':
//         return '#FF7431';
//       case 'anual':
//         return '#FF3131';
//       default:
//         return '#FF3131';
//     }
//   };

//   return (
//     <>
//       <Grid container spacing={3}>
//         <Grid item xs={10} sm={3}>
//           <FormControl fullWidth>
//             <InputLabel>Metodologia</InputLabel>
//             <Select
//               value={selectedMetodology}
//               onChange={(e) => setSelectedMetodology(e.target.value)}
//             >
//               {isFetched && uniqueModalities?.map((metodolgy) => (
//                 <MenuItem key={metodolgy} value={metodolgy}>
//                   {metodolgy}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Grid>
//         <Grid item xs={1} sm={1}>
//           <IconButton onClick={clearMetodology} size="large">
//             <HighlightOffIcon />
//           </IconButton>
//         </Grid>

//         <Grid item xs={10} sm={3}>
//           <FormControl fullWidth>
//             <InputLabel>Frequência</InputLabel>
//             <Select
//               value={selectedFrequency}
//               onChange={(e) => setSelectedFrequency(e.target.value)}
//             >
//               {isFetched && uniqueFrequencies?.map((frequency) => (
//                 <MenuItem key={frequency} value={frequency}>
//                   {frequency}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Grid>
//         <Grid item xs={1} sm={1}>
//           <IconButton onClick={clearFrequency} size='large'>
//             <HighlightOffIcon />
//           </IconButton>
//         </Grid>

//         <Grid item xs={10} sm={3}>
//           <FormControl fullWidth>
//             <InputLabel>Modalidades</InputLabel>
//             <Select
//               value={selectedModality}
//               onChange={(e) => setSelectedModality(e.target.value)}
//             >
//               {isFetched && uniqueTypes?.map((type) => (
//                 <MenuItem key={type} value={type}>
//                   {type}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Grid>
//         <Grid item xs={1} sm={1}>
//           <IconButton onClick={clearType} size='large'>
//             <HighlightOffIcon />
//           </IconButton>
//         </Grid>
//       </Grid>

//       <Grid container spacing={3} style={{ marginTop: 20 }}>
//         {filteredPlans?.length && filteredPlans?.map(plan => (
//           <Grid item xs={12} sm={6} lg={4} xl={2} key={plan.id}>
//             <Card sx={{ borderRadius: 2, background: getModalityColor(plan.metodology) }}>
//               <CardActionArea sx={{ padding: 2 }}>
//               <Link to={`/dashboard/plans/${plan.id}`}>
//                 <Typography variant="h6" sx={{ fontWeight: '700' }}>{plan.metodology}</Typography>
//                 <Typography variant="h6" sx={{ fontWeight: '700', fontSize: '3.5em' }}>{getTypeText(plan.modality)}</Typography>
//                 <Typography sx={{ textAlign: 'center', textWrap: 'balance' }}>Escolha entre corrida, ciclismo ou natação</Typography>
//                 <Typography variant="h6" sx={{ fontWeight: '700', width: 'fit-content', background: getFrequencyColor(plan.frequency), padding: '0.125em 1em', borderRadius: 3, margin: '1em auto' }}>{plan.frequency}</Typography>
//                 <Typography sx={{ textAlign: 'center' }}>R$ <span className={styles.price}>{plan.value}</span>,00</Typography>
//               </Link>
//               </CardActionArea>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </>
//   );
// }

// export default Plans;

import { useState } from 'react';
import { useFetchPlans } from '../../api/PlansApi';
import { Alert, Card, CardActionArea, FormControl, Grid, InputLabel, MenuItem, Select, Typography, SelectChangeEvent, Skeleton } from '@mui/material';
import styles from './index.module.css';
import { red } from '@mui/material/colors';
import { Link } from 'react-router-dom';
import { PlanType } from '../../types/types';

function Plans() {
  const { data, isLoading, isError } = useFetchPlans();
  const [selectedMetodology, setSelectedMetodology] = useState<string>('todas');
  const [selectedFrequency, setSelectedFrequency] = useState<string>('todas');
  const [selectedModality, setSelectedModality] = useState<string>('todas');

  const modalities = ['todas', 'uma modalidade', 'duas modalidades', 'três modalidades'];
  const metodologies = ['todas', 'presencial', 'online'];
  const frequencies = ['todas', 'mensal', 'trimestral', 'semestral', 'anual'];

  const handleModalityChange = (event: SelectChangeEvent) => {
    setSelectedModality(event.target.value);
  };

  const handleFrequencyChange = (event: SelectChangeEvent) => {
    setSelectedFrequency(event.target.value);
  };

  const handleMetodologyChange = (event: SelectChangeEvent) => {
    setSelectedMetodology(event.target.value);
  };

  function filterPlans(
    plans: PlanType[],
    modality: string,
    frequency: string,
    metodology: string
  ): PlanType[] {
    if (isError || isLoading) {
      return []
    }
    return plans.filter(plan =>
      (modality === 'todas' || plan.modality === modality) &&
      (metodology === 'todas' || plan.metodology === metodology) &&
      (frequency === 'todas' || plan.frequency === frequency)
    );
  }

  const getTypeText = (type: string): string => {
    switch (type) {
      case 'uma modalidade':
        return '1MOD.';
      case 'two':
        return '2MOD.';
      case 'three':
        return '3MOD.';
      default:
        return '';
    }
  };

  const getModalityColor = (modality: string): string => {
    return modality === 'online' ? red[50] : red[100];
  };

  const getFrequencyColor = (frequency: string): string => {
    switch (frequency) {
      case 'mensal':
        return '#FFED00';
      case 'trimestral':
        return '#FFBD59';
      case 'semestral':
        return '#FF7431';
      case 'anual':
        return '#FF3131';
      default:
        return '#FF3131';
    }
  };

  const filteredPlans = filterPlans(data, selectedModality, selectedFrequency, selectedMetodology);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Metodologia</InputLabel>
            <Select
              value={selectedMetodology}
              onChange={handleMetodologyChange}
            >
              {metodologies.map((metodology) => (
                <MenuItem key={metodology} value={metodology}>
                  {metodology}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Frequência</InputLabel>
            <Select
              value={selectedFrequency}
              onChange={handleFrequencyChange}
            >
              {frequencies.map((frequency) => (
                <MenuItem key={frequency} value={frequency}>
                  {frequency}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Modalidades</InputLabel>
            <Select
              value={selectedModality}
              onChange={handleModalityChange}
            >
              {modalities.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      {
        isLoading ? (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} lg={4} xl={2}>
              <Skeleton height={360} />
            </Grid>
            <Grid item xs={12} sm={6} lg={4} xl={2}>
              <Skeleton height={360} />
            </Grid>
            <Grid item xs={12} sm={6} lg={4} xl={2}>
              <Skeleton height={360} />
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={3} style={{ marginTop: 20 }}>
            {
              !isError ? filteredPlans?.map(plan => (
                <Grid item xs={12} sm={6} lg={4} xl={2} key={plan.id}>
                  <Card >
                    <CardActionArea sx={{ padding: 2, borderRadius: 2, background: getModalityColor(plan.metodology) }}>
                      <Link to={`/dashboard/plans/${plan.id}`}>
                        <Typography variant="h6" sx={{ fontWeight: '700' }}>{plan.metodology}</Typography>
                        <Typography variant="h6" sx={{ fontWeight: '700', fontSize: '3.5em' }}>{getTypeText(plan.modality)}</Typography>
                        <Typography sx={{ textAlign: 'center', textWrap: 'balance' }}>Escolha entre corrida, ciclismo ou natação</Typography>
                        <Typography variant="h6" sx={{ fontWeight: '700', width: 'fit-content', background: getFrequencyColor(plan.frequency), padding: '0.125em 1em', borderRadius: 3, margin: '1em auto' }}>{plan.frequency}</Typography>
                        <Typography sx={{ textAlign: 'center' }}>R$ <span className={styles.price}>{plan.value}</span>,00</Typography>
                      </Link>
                    </CardActionArea>
                  </Card>
                </Grid>
              )) : (
                <Grid item>
                  <Alert severity="error">Nenhum plano encontrado, por favor tente novamente mais tarde</Alert>
                </Grid>
              )}
          </Grid>
        )
      }
    </>
  );
}

export default Plans;
