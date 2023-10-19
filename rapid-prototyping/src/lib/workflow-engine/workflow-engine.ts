import type { Workflow } from './models/workflow.model';
import workflowApprovalProcessor from './processors/workflow-approval.processor';
import workflowQueryProcessor from './processors/workflow-query.processor';
export class WorkflowEngine {

    public approve(workflow: Workflow): Workflow {
        return workflowApprovalProcessor.approve(workflow);
    }

    public query(workflow: Workflow): Workflow {
        return workflowQueryProcessor.query(workflow);
    }

    public resolveQuery(workflow: Workflow): Workflow {
        return workflowQueryProcessor.resolveQuery(workflow);
    }
}

export default new WorkflowEngine();
