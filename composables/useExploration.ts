import { ref, computed } from "vue";

interface Claim {
	id: string;
	text: string;
	type: "fact" | "belief";
	isValid?: boolean;
	evidence?: string[];
}

interface Exploration {
	id: string;
	topic: string;
	initialBeliefs: string;
	claims: Claim[];
	implications: string[];
	createdAt: Date;
}

// Global state
const currentExploration = ref<Exploration | null>(null);
const explorations = ref<Exploration[]>([]);

export function useExploration() {
	const currentStep = computed((): string => {
		if (!currentExploration.value) return "topic";
		if (!currentExploration.value.initialBeliefs) return "beliefs";
		if (!currentExploration.value.claims.length) return "claims";
		if (currentExploration.value.claims.some((c) => c.isValid === undefined))
			return "validation";
		if (currentExploration.value.claims.some((c) => !c.evidence?.length))
			return "evidence";
		if (!currentExploration.value.implications.length) return "implications";
		return "summary";
	});

	function startNewExploration(topic: string) {
		const newExploration: Exploration = {
			id: crypto.randomUUID(),
			topic,
			initialBeliefs: "",
			claims: [],
			implications: [],
			createdAt: new Date(),
		};
		currentExploration.value = newExploration;
		explorations.value.push(newExploration);
	}

	function updateBeliefs(beliefs: string) {
		if (currentExploration.value) {
			currentExploration.value.initialBeliefs = beliefs;
		}
	}

	function addClaim(claim: Omit<Claim, "id">) {
		if (currentExploration.value) {
			currentExploration.value.claims.push({
				id: crypto.randomUUID(),
				...claim,
			});
		}
	}

	function loadExploration(id: string) {
		const exploration = explorations.value.find((e) => e.id === id);
		if (exploration) {
			currentExploration.value = exploration;
		}
	}

	const removeClaim = (id: string) => {
		if (currentExploration.value) {
			currentExploration.value.claims = currentExploration.value.claims.filter(c => c.id !== id)
		}
	}

	function validateClaim(id: string, isValid: boolean) {
		if (currentExploration.value) {
			const claim = currentExploration.value.claims.find(c => c.id === id)
			if (claim) {
				claim.isValid = isValid
			}
		}
	}

	function addEvidence(claimId: string, evidence: string) {
		if (currentExploration.value) {
			const claim = currentExploration.value.claims.find(c => c.id === claimId)
			if (claim) {
				if (!claim.evidence) {
					claim.evidence = []
				}
				claim.evidence.push(evidence)
			}
		}
	}

	function removeEvidence(claimId: string, index: number) {
		if (currentExploration.value) {
			const claim = currentExploration.value.claims.find(c => c.id === claimId)
			if (claim && claim.evidence) {
				claim.evidence.splice(index, 1)
			}
		}
	}

	function addImplication(implication: string) {
		if (currentExploration.value) {
			currentExploration.value.implications.push(implication)
		}
	}

	function removeImplication(index: number) {
		if (currentExploration.value) {
			currentExploration.value.implications.splice(index, 1)
		}
	}

	return {
		currentExploration,
		explorations,
		currentStep,
		startNewExploration,
		updateBeliefs,
		addClaim,
		loadExploration,
		removeClaim,
		validateClaim,
		addEvidence,
		removeEvidence,
		addImplication,
		removeImplication,
	};
}
