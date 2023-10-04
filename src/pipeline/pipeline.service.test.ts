import { CAMPAIGNS_PLATFORM_INSIGHTS } from './pipeline.const';
import { createInsightsPipelineTasks, runPipeline } from './pipeline.service';

it('pipeline', async () => {
    return runPipeline(CAMPAIGNS_PLATFORM_INSIGHTS, {
        accountId: '501728803750343',
        start: '2023-06-01',
        end: '2023-06-05',
    })
        .then((results) => expect(results).toBeDefined())
        .catch((error) => {
            console.error({ error });
            throw error;
        });
});

it('create-tasks', async () => {
    return createInsightsPipelineTasks({
        start: '2023-08-01',
        end: '2023-09-01',
    })
        .then((result) => expect(result).toBeDefined())
        .catch((error) => {
            console.error({ error });
            throw error;
        });
});
