import { useEffect, useState } from 'react';
import { getPlans } from '../../api/PlansApi';
import { Card, CardActionArea, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import styles from './index.module.css';
import { red } from '@mui/material/colors';
import { Link } from 'react-router-dom';

interface Plan {
  id: string;
  modality: string;
  frequency: string;
  type: string;
  value: number;
}

function Plans() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [filteredPlans, setFilteredPlans] = useState<Plan[]>(plans);

  const [selectedModality, setSelectedModality] = useState<string>('');
  const [selectedFrequency, setSelectedFrequency] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await getPlans();
        setPlans(data);
      } catch (err: unknown) {
        console.log(err)
      }
    }
    fetchPlans()
  }, []);

  useEffect(() => {
    let filtered = plans;

    if (selectedModality) {
      filtered = filtered.filter(plan => plan.modality === selectedModality);
    }

    if (selectedFrequency) {
      filtered = filtered.filter(plan => plan.frequency === selectedFrequency);
    }

    if (selectedType) {
      filtered = filtered.filter(plan => plan.type === selectedType);
    }

    setFilteredPlans(filtered);
  }, [selectedModality, selectedFrequency, selectedType, plans]);

  const uniqueModalities = plans.reduce<string[]>((acc, plan) => {
    if (!acc.includes(plan.modality)) {
      acc.push(plan.modality);
    }
    return acc;
  }, []);


  const uniqueFrequencies = plans.reduce<string[]>((acc, plan) => {
    if (!acc.includes(plan.frequency)) {
      acc.push(plan.frequency);
    }
    return acc;
  }, []);

  const uniqueTypes = plans.reduce<string[]>((acc, plan) => {
    if (!acc.includes(plan.type)) {
      acc.push(plan.type);
    }
    return acc;
  }, []);

  const clearModality = () => {
    setSelectedModality('');
  };

  const clearFrequency = () => {
    setSelectedFrequency('');
  };

  const clearType = () => {
    setSelectedType('');
  };

  const getTypeText = (type: string): string => {
    switch (type) {
      case 'one':
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

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={10} sm={3}>
          <FormControl fullWidth>
            <InputLabel>Modalidade</InputLabel>
            <Select
              value={selectedModality}
              onChange={(e) => setSelectedModality(e.target.value)}
            >
              {uniqueModalities.map((modality) => (
                <MenuItem key={modality} value={modality}>
                  {modality}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={1} sm={1}>
          <IconButton onClick={clearModality} size="large">
            <HighlightOffIcon />
          </IconButton>
        </Grid>

        <Grid item xs={10} sm={3}>
          <FormControl fullWidth>
            <InputLabel>Frequência</InputLabel>
            <Select
              value={selectedFrequency}
              onChange={(e) => setSelectedFrequency(e.target.value)}
            >
              {uniqueFrequencies.map((frequency) => (
                <MenuItem key={frequency} value={frequency}>
                  {frequency}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={1} sm={1}>
          <IconButton onClick={clearFrequency} size='large'>
            <HighlightOffIcon />
          </IconButton>
        </Grid>

        <Grid item xs={10} sm={3}>
          <FormControl fullWidth>
            <InputLabel>Esportes</InputLabel>
            <Select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {uniqueTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={1} sm={1}>
          <IconButton onClick={clearType} size='large'>
            <HighlightOffIcon />
          </IconButton>
        </Grid>
      </Grid>

      <Grid container spacing={3} style={{ marginTop: 20 }}>
        {filteredPlans.map(plan => (
          <Grid item xs={12} sm={6} lg={4} xl={2} key={plan.id}>
            <Card >
              <CardActionArea sx={{ padding: 2, borderRadius: 2, background: getModalityColor(plan.modality) }}>
              <Link to={`/dashboard/plans/${plan.id}`}>
                <Typography variant="h6" sx={{ fontWeight: '700' }}>{plan.modality}</Typography>
                <Typography variant="h6" sx={{ fontWeight: '700', fontSize: '3.5em' }}>{getTypeText(plan.type)}</Typography>
                <Typography sx={{ textAlign: 'center', textWrap: 'balance' }}>Escolha entre corrida, ciclismo ou natação</Typography>
                <Typography variant="h6" sx={{ fontWeight: '700', width: 'fit-content', background: getFrequencyColor(plan.frequency), padding: '0.125em 1em', borderRadius: 3, margin: '1em auto' }}>{plan.frequency}</Typography>
                <Typography sx={{ textAlign: 'center' }}>R$ <span className={styles.price}>{plan.value}</span>,00</Typography>
              </Link>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Plans;
