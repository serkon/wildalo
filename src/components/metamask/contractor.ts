import { api } from 'src/components/axios/axios.component';
import { store } from 'src/store/store';
import { Wildapter } from './adaptor';
export const Contractor = {
  getNonce: (address: string): Promise<string> => api.post('/contractor/nonce', { address }),
  sign: async (nonce: string) => await Wildapter.sign(nonce),
  header: async () => {
    const nonce = await Contractor.getNonce(store.getState().metamask.walletAddress);
    const signature = (await Contractor.sign(nonce)) as string;
    return { headers: { signature } };
  },
};
