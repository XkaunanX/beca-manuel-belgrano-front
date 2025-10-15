"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Check, ChevronRight, HelpCircle, Loader2, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";

// Importar servicios
import { getProvinces } from "@/services/province";
import { institutionService } from "@/services/institution";
import { unitService } from "@/services/unit";
import { careerService } from "@/services/career";
import { bankBranchService } from "@/services/bankBranch";

// ---------- FilterableCombobox ----------
function FilterableCombobox({ value, onChange, options, placeholder, disabled = false }: { value: string; onChange: (v: string) => void; options: string[]; placeholder: string; disabled?: boolean; }) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between" disabled={disabled}>
          {value || placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
        <Command>
          <CommandInput placeholder={`Buscar ${placeholder.toLowerCase()}...`} />
          <CommandList>
            <CommandEmpty>No se encontraron resultados</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option}
                  value={option}
                  onSelect={(currentValue) => {
                    onChange(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === option ? "opacity-100" : "opacity-0")} />
                  {option}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

// ---------- Componente principal ----------
export function FormularioInscripcion() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    provincia: "",
    localidad: "",
    institucionUniversitaria: "",
    unidadAcademica: "",
    carrera: "",
    anioIngresoUniversidad: "",
    semestreIngreso: "",
    sucursalBanco: "",
    aceptaTerminos: false,
  });

  // Datos dinámicos
  const [provincias, setProvincias] = useState<string[]>([]);
  const [universidades, setUniversidades] = useState<string[]>([]);
  const [unidades, setUnidades] = useState<string[]>([]);
  const [carreras, setCarreras] = useState<string[]>([]);
  const [sucursales, setSucursales] = useState<string[]>([]);

  const totalSteps = 3;
  const progress = ((step - 1) / totalSteps) * 100;

  useEffect(() => {
    // Cargar provincias al inicio
    getProvinces().then((data) => setProvincias(data.map((p) => p.name)));
  }, []);

  useEffect(() => {
    if (formData.localidad) {
      // Cargar universidades disponibles
      institutionService.getAll().then((data) => setUniversidades(data.map((u) => u.name)));
    }
  }, [formData.localidad]);

  useEffect(() => {
    if (formData.institucionUniversitaria) {
      // Cargar unidades según universidad
      unitService.getAll().then((data) => {
        const filtered = data.filter((u) => u.institution_id.toString() === formData.institucionUniversitaria); // si usas ID, ajustar
        setUnidades(filtered.map((u) => u.name));
      });
    }
  }, [formData.institucionUniversitaria]);

  useEffect(() => {
    if (formData.unidadAcademica) {
      // Cargar carreras según unidad
      careerService.getAll().then((data) => {
        const filtered = data.filter((c) => c.id.toString() === formData.unidadAcademica); // ajustar según backend
        setCarreras(filtered.map((c) => c.id.toString())); // si quieres name, mapear
      });
    }
  }, [formData.unidadAcademica]);

  useEffect(() => {
    if (formData.semestreIngreso) {
      // Cargar sucursales según provincia
      bankBranchService.getAll().then((data) => {
        const filtered = data.filter((b) => b.province_id.toString() === formData.provincia);
        setSucursales(filtered.map((b) => b.name));
      });
    }
  }, [formData.provincia, formData.semestreIngreso]);

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateStep = (currentStep: number) => {
    const stepErrors: Record<string, string> = {};
    switch (currentStep) {
      case 1:
        if (!formData.provincia) stepErrors.provincia = "Provincia es obligatoria";
        if (!formData.localidad) stepErrors.localidad = "Localidad es obligatoria";
        break;
      case 2:
        if (!formData.institucionUniversitaria) stepErrors.institucionUniversitaria = "Universidad es obligatoria";
        if (!formData.unidadAcademica) stepErrors.unidadAcademica = "Unidad académica es obligatoria";
        if (!formData.carrera) stepErrors.carrera = "Carrera es obligatoria";
        break;
      case 3:
        if (!formData.anioIngresoUniversidad) stepErrors.anioIngresoUniversidad = "Año de ingreso es obligatorio";
        if (!formData.semestreIngreso) stepErrors.semestreIngreso = "Semestre de ingreso es obligatorio";
        if (!formData.sucursalBanco) stepErrors.sucursalBanco = "Sucursal Banco es obligatoria";
        if (!formData.aceptaTerminos) stepErrors.aceptaTerminos = "Debes aceptar los términos";
        break;
    }
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) setStep(step + 1);
  };
  const prevStep = () => setStep(step - 1);

  const handleSubmit = () => {
    if (validateStep(3)) {
      setIsSubmitting(true);
      // Aquí iría fetch/axios POST a RegistrationController
      setTimeout(() => {
        console.log("Datos enviados:", formData);
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 1000);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <Label>Provincia</Label>
            <Select value={formData.provincia} onValueChange={(v) => updateFormData("provincia", v)}>
              <SelectTrigger><SelectValue placeholder="Selecciona tu provincia" /></SelectTrigger>
              <SelectContent>
                {provincias.map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}
              </SelectContent>
            </Select>
            {errors.provincia && <p className="text-red-500">{errors.provincia}</p>}

            <Label>Localidad</Label>
            <FilterableCombobox
              value={formData.localidad}
              onChange={(v) => updateFormData("localidad", v)}
              options={["Placeholder localidad"]}
              placeholder="Selecciona localidad"
              disabled={!formData.provincia}
            />
            {errors.localidad && <p className="text-red-500">{errors.localidad}</p>}
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <Label>Universidad</Label>
            <FilterableCombobox
              value={formData.institucionUniversitaria}
              onChange={(v) => updateFormData("institucionUniversitaria", v)}
              options={universidades}
              placeholder="Selecciona universidad"
              disabled={!formData.localidad}
            />
            {errors.institucionUniversitaria && <p className="text-red-500">{errors.institucionUniversitaria}</p>}

            <Label>Unidad académica</Label>
            <FilterableCombobox
              value={formData.unidadAcademica}
              onChange={(v) => updateFormData("unidadAcademica", v)}
              options={unidades}
              placeholder="Selecciona unidad académica"
              disabled={!formData.institucionUniversitaria}
            />
            {errors.unidadAcademica && <p className="text-red-500">{errors.unidadAcademica}</p>}

            <Label>Carrera</Label>
            <FilterableCombobox
              value={formData.carrera}
              onChange={(v) => updateFormData("carrera", v)}
              options={carreras}
              placeholder="Selecciona carrera"
              disabled={!formData.unidadAcademica}
            />
            {errors.carrera && <p className="text-red-500">{errors.carrera}</p>}
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <Label>Año de Ingreso</Label>
            <Input type="number" value={formData.anioIngresoUniversidad} onChange={(e) => updateFormData("anioIngresoUniversidad", e.target.value)} />
            {errors.anioIngresoUniversidad && <p className="text-red-500">{errors.anioIngresoUniversidad}</p>}

            <Label>Semestre</Label>
            <Select value={formData.semestreIngreso} onValueChange={(v) => updateFormData("semestreIngreso", v)}>
              <SelectTrigger><SelectValue placeholder="Selecciona semestre" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Primero">Primero</SelectItem>
                <SelectItem value="Segundo">Segundo</SelectItem>
              </SelectContent>
            </Select>
            {errors.semestreIngreso && <p className="text-red-500">{errors.semestreIngreso}</p>}

            <Label>Sucursal Banco</Label>
            <FilterableCombobox
              value={formData.sucursalBanco}
              onChange={(v) => updateFormData("sucursalBanco", v)}
              options={sucursales}
              placeholder="Selecciona sucursal"
              disabled={!formData.semestreIngreso}
            />
            {errors.sucursalBanco && <p className="text-red-500">{errors.sucursalBanco}</p>}

            <Checkbox checked={formData.aceptaTerminos} onCheckedChange={(checked) => updateFormData("aceptaTerminos", checked)}>
              Acepto los términos y condiciones
            </Checkbox>
            {errors.aceptaTerminos && <p className="text-red-500">{errors.aceptaTerminos}</p>}
          </div>
        );
      default:
        return null;
    }
  };

  if (isSubmitted) {
    return (
      <Alert className="bg-green-50 border-green-200">
        <Check className="h-5 w-5 text-green-600" />
        <AlertTitle className="text-green-800">Solicitud enviada</AlertTitle>
        <AlertDescription className="text-green-700">Tu formulario fue recibido correctamente.</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <Progress value={progress} className="h-2" />
      {renderStep()}
      <div className="flex justify-between pt-4 border-t">
        {step > 1 ? <Button onClick={prevStep}>Anterior</Button> : <Button asChild><Link href="/">Cancelar</Link></Button>}
        {step < totalSteps ? <Button onClick={nextStep}>Siguiente <ChevronRight className="ml-1 h-4 w-4" /></Button> :
          <Button onClick={handleSubmit} disabled={isSubmitting}>{isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando...</> : "Enviar"}</Button>}
      </div>
      <Button variant="link" size="sm" className="text-slate-500">
        <HelpCircle className="mr-1 h-4 w-4" /> ¿Necesitas ayuda?
      </Button>
    </div>
  );
}