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
      case 'duas modalidades':
        return '2MOD.';
      case 'tres modalidades':
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
