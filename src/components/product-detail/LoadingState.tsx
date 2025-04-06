
import Layout from '@/components/Layout';
import { Loader2 } from 'lucide-react';

export const LoadingState = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col justify-center items-center h-64">
          <div className="glass-card max-w-md w-full p-6 animate-glow">
            <div className="flex items-center mb-4">
              <Loader2 className="h-6 w-6 text-primary animate-spin mr-3" />
              <h3 className="text-xl font-medium text-primary">Finding the perfect match</h3>
            </div>
            <p className="text-foreground/70 mb-2">Our AI is analyzing your needs against SHL's assessment database...</p>
            <div className="space-y-3 mt-4">
              <div className="h-2 bg-muted rounded animate-pulse"></div>
              <div className="h-2 bg-muted rounded animate-pulse" style={{ animationDelay: '0.2s', width: '80%' }}></div>
              <div className="h-2 bg-muted rounded animate-pulse" style={{ animationDelay: '0.4s', width: '60%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
