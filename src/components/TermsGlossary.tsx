import { useState } from "react";
import { ArrowLeft, Search, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { securityTerms, categories, type SecurityTerm } from "@/data/securityTerms";

interface TermsGlossaryProps {
  onBack: () => void;
}

const categoryColors: Record<string, string> = {
  'Governance': 'bg-chart-1/10 text-chart-1 border-chart-1/30',
  'Cryptography': 'bg-chart-2/10 text-chart-2 border-chart-2/30',
  'Network Security': 'bg-chart-3/10 text-chart-3 border-chart-3/30',
  'Web Security': 'bg-chart-4/10 text-chart-4 border-chart-4/30',
  'Risk Management': 'bg-primary/10 text-primary border-primary/30',
};

const TermsGlossary = ({ onBack }: TermsGlossaryProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredTerms = securityTerms.filter((term: SecurityTerm) => {
    const matchesSearch = 
      term.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      term.definition.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || term.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const groupedTerms = categories.reduce((acc, category) => {
    acc[category] = filteredTerms.filter((term: SecurityTerm) => term.category === category);
    return acc;
  }, {} as Record<string, SecurityTerm[]>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <h2 className="text-2xl font-bold text-foreground">
            Cybersecurity Terms
          </h2>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search terms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={selectedCategory === null ? "default" : "outline"}
                className={`cursor-pointer transition-colors ${
                  selectedCategory === null ? 'bg-primary' : 'hover:bg-muted'
                }`}
                onClick={() => setSelectedCategory(null)}
              >
                All ({securityTerms.length})
              </Badge>
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={`cursor-pointer transition-colors ${
                    selectedCategory === category 
                      ? 'bg-primary' 
                      : 'hover:bg-muted'
                  }`}
                  onClick={() => setSelectedCategory(
                    selectedCategory === category ? null : category
                  )}
                >
                  {category} ({securityTerms.filter((t: SecurityTerm) => t.category === category).length})
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Terms by Category */}
      {selectedCategory ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge className={categoryColors[selectedCategory]}>
                {selectedCategory}
              </Badge>
              <span className="text-muted-foreground font-normal text-sm">
                ({filteredTerms.length} terms)
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredTerms.map((term: SecurityTerm, index: number) => (
                <div 
                  key={index}
                  className="p-4 bg-muted/30 rounded-lg border border-border"
                >
                  <h4 className="font-semibold text-foreground mb-2">
                    {term.term}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {term.definition}
                  </p>
                </div>
              ))}
              {filteredTerms.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  No terms found matching your search.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        categories.map((category) => {
          const terms = groupedTerms[category];
          if (terms.length === 0) return null;
          
          return (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge className={categoryColors[category]}>
                    {category}
                  </Badge>
                  <span className="text-muted-foreground font-normal text-sm">
                    ({terms.length} terms)
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  {terms.map((term: SecurityTerm, index: number) => (
                    <div 
                      key={index}
                      className="p-4 bg-muted/30 rounded-lg border border-border"
                    >
                      <h4 className="font-semibold text-foreground mb-2">
                        {term.term}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {term.definition}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })
      )}
    </div>
  );
};

export default TermsGlossary;
