import MaterialAlert from '@mui/material/Alert';
import Fade from '@mui/material/Fade';
import { useEffect } from 'react';
import { useTimeout, useUx } from 'shared/hooks';

import styles from './styles.module.scss';

interface IAlert {
  timeout?: number;
}

function Alert({ timeout = 5000 }: IAlert) {
  const {
    state: { alert },
    actions: { clearAlert },
  } = useUx();
  const { start, clear } = useTimeout({
    callback: () => clearAlert(),
    timeout,
    startNow: false,
  });

  useEffect(() => {
    if (alert.show) {
      start();
    } else {
      clear();
    }
    return clear;
  }, [alert.show, clear, start]);

  return (
    <Fade in={alert.show} className={styles.alert}>
      <MaterialAlert
        data-testid="alert"
        onClose={() => {
          clear();
          clearAlert();
        }}
        variant="filled"
        severity={alert.type}
      >
        {alert.message}
      </MaterialAlert>
    </Fade>
  );
}

export default Alert;
