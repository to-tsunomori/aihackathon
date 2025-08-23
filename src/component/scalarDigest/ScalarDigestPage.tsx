import React from "react";
import {
	Container,
	Typography,
	Box,
	List,
	ListItem,
	ListItemText,
	Divider,
	Paper,
} from "@mui/material";

interface ScalarDigestPageProps {
	scalarId: string;
}

export const ScalarDigestPage: React.FC<ScalarDigestPageProps> = () => {
	// サンプルデータ（実際にはAPIから取得）
	const digestData = {
		title: "ソーシャルメディアが青少年のメンタルヘルスに与える影響",
		authors: "エミリー・カーター博士、デビッド・リー博士",
		publishDate: "2024年1月15日",
		overview: [
			"本研究論文では、ソーシャルメディアの利用と青少年の精神的幸福との間の複雑な関係を探る。",
			"サイバーいじめ、社会的比較、オンラインサポートネットワークなどの要因を考慮し、肯定的および否定的な影響の両方を検証する。",
		],
		novelty: [
			"ソーシャルメディアが青少年の発達に与える多面的な影響を、縦断的データを用いて分析した初めての研究の一つである。",
			"精神的レジリエンスを促進する上で、オンライン上の肯定的な相互作用が果たす役割を定量的に評価した。",
		],
		originality: [
			"ソーシャルメディアの影響を評価するための新しいフレームワークを提案し、個人の脆弱性と保護要因を考慮に入れている。",
			"デジタルリテラシー教育プログラムの有効性を測定し、青少年のオンライン行動に対する具体的な介入策を提示する。",
		],
		challenges: [
			"今後の課題は、急速に変化するソーシャルメディアプラットフォームの動向を追跡し、長期的な影響を評価し続けることである。",
			"展望として、保護者、教育者、政策立案者が連携し、青少年が安全にデジタル世界を航行できるような支援環境を構築することが期待される。",
		],
		relatedResearch: [
			"既存の研究では、ソーシャルメディアの利用時間と抑うつ症状との相関関係が指摘されている（Twenge, 2017）。",
			"オンラインコミュニティが、社会的孤立を感じる青少年に対して重要なサポートを提供できる可能性も示唆されている（Best et al., 2014）。",
		],
	};

	const SectionComponent: React.FC<{
		title: string;
		items: string[];
		showDivider?: boolean;
	}> = ({ title, items, showDivider = true }) => (
		<Box component="section" sx={{ mb: showDivider ? 5 : 0 }}>
			<Typography
				variant="h4"
				component="h2"
				sx={{
					fontFamily: '"Newsreader", serif',
					fontWeight: "bold",
					mb: 3,
					color: "#1f2937",
					fontSize: { xs: "1.5rem", md: "2rem" },
				}}
			>
				{title}
			</Typography>
			<List sx={{ p: 0 }}>
				{items.map((item, index) => (
					<ListItem key={index} sx={{ px: 0, py: 0.5 }}>
						<ListItemText
							primary={`• ${item}`}
							sx={{
								"& .MuiListItemText-primary": {
									fontSize: "1.125rem",
									lineHeight: 1.75,
									color: "#6b7280",
								},
							}}
						/>
					</ListItem>
				))}
			</List>
			{showDivider && <Divider sx={{ mt: 5, borderColor: "#e5e7eb" }} />}
		</Box>
	);

	return (
		<Container maxWidth="xl" sx={{ py: 2 }}>
			<Paper elevation={0} sx={{ bgcolor: "transparent" }}>
				<Box sx={{ maxWidth: "1200px", mx: "auto", px: { xs: 2, md: 4 } }}>
					{/* Header */}
					<Box component="header" sx={{ textAlign: "center", mb: 6 }}>
						<Typography
							variant="h1"
							component="h1"
							sx={{
								fontFamily: '"Newsreader", serif',
								fontWeight: "bold",
								fontSize: { xs: "2.25rem", md: "3rem" },
								lineHeight: 1.2,
								color: "#1f2937",
								mb: 2,
							}}
						>
							{digestData.title}
						</Typography>
						<Typography
							variant="body1"
							sx={{
								fontSize: "1.125rem",
								color: "#6b7280",
							}}
						>
							著者: {digestData.authors} | 出版日: {digestData.publishDate}
						</Typography>
					</Box>

					{/* Main Content */}
					<Box component="main">
						<SectionComponent title="概要" items={digestData.overview} />

						<SectionComponent title="新規性" items={digestData.novelty} />

						<SectionComponent title="独創性" items={digestData.originality} />

						<SectionComponent
							title="課題と展望"
							items={digestData.challenges}
						/>

						<SectionComponent
							title="関連研究"
							items={digestData.relatedResearch}
							showDivider={false}
						/>
					</Box>
				</Box>
			</Paper>
		</Container>
	);
};
