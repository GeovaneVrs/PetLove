import React, { useState } from 'react';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { adoptionService } from '../services/adoption.service';
import { ROUTES } from '../constants/routes';
import type { RootStackParamList } from '../navigation/types';
import type { AdoptionFormData } from '../types';
import { useTheme } from '../theme/ThemeProvider';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { globalStyles } from '../styles/global';

const schema = yup.object({
  fullName: yup.string().required('Nome é obrigatório').min(3, 'Mínimo 3 caracteres'),
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  phone: yup.string().required('Telefone é obrigatório').min(10, 'Telefone inválido'),
  address: yup.string().required('Endereço é obrigatório'),
  hasExperience: yup.boolean().required(),
  hasOtherPets: yup.boolean().required(),
  message: yup.string().required('Conte-nos sobre você').min(20, 'Mínimo 20 caracteres'),
});

export default function AdoptionFormScreen() {
  const { colors, spacing, typography } = useTheme();
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, typeof ROUTES.ADOPTION_FORM>>();
  const [modalVisible, setModalVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AdoptionFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      hasExperience: false,
      hasOtherPets: false,
      message: '',
    },
  });

  const onSubmit = async (data: AdoptionFormData) => {
    setSubmitting(true);
    try {
      await adoptionService.submit(route.params.petId, data);
      setModalVisible(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={[globalStyles.screen, { backgroundColor: colors.background }]}>
      <Header
        title="Formulário de adoção"
        subtitle={`Pet: ${route.params.petName}`}
        showBack
        onBack={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={[globalStyles.screenPadding, { paddingBottom: 40 }]}>
        <Text style={[typography.bodySmall, { color: colors.textSecondary, marginBottom: spacing.lg }]}>
          Preencha os dados abaixo. Nossa equipe entrará em contato em até 48h.
        </Text>

        <Controller
          control={control}
          name="fullName"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input label="Nome completo" onBlur={onBlur} onChangeText={onChange} value={value} error={errors.fullName?.message} />
          )}
        />
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input label="E-mail" keyboardType="email-address" autoCapitalize="none" onBlur={onBlur} onChangeText={onChange} value={value} error={errors.email?.message} />
          )}
        />
        <Controller
          control={control}
          name="phone"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input label="Telefone" keyboardType="phone-pad" onBlur={onBlur} onChangeText={onChange} value={value} error={errors.phone?.message} />
          )}
        />
        <Controller
          control={control}
          name="address"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input label="Endereço" onBlur={onBlur} onChangeText={onChange} value={value} error={errors.address?.message} />
          )}
        />

        <View style={styles.switchRow}>
          <Text style={[typography.body, { color: colors.text, flex: 1 }]}>Já teve pets antes?</Text>
          <Controller
            control={control}
            name="hasExperience"
            render={({ field: { onChange, value } }) => (
              <Switch value={value} onValueChange={onChange} trackColor={{ true: colors.primary }} />
            )}
          />
        </View>
        <View style={styles.switchRow}>
          <Text style={[typography.body, { color: colors.text, flex: 1 }]}>Possui outros pets?</Text>
          <Controller
            control={control}
            name="hasOtherPets"
            render={({ field: { onChange, value } }) => (
              <Switch value={value} onValueChange={onChange} trackColor={{ true: colors.primary }} />
            )}
          />
        </View>

        <Controller
          control={control}
          name="message"
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Por que deseja adotar?"
              multiline
              numberOfLines={4}
              style={{ minHeight: 100, textAlignVertical: 'top' }}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={errors.message?.message}
            />
          )}
        />

        <Button label="Enviar solicitação" loading={submitting} onPress={handleSubmit(onSubmit)} />
      </ScrollView>

      <Modal
        visible={modalVisible}
        title="Solicitação enviada!"
        message={`Recebemos seu interesse em adotar ${route.params.petName}. Entraremos em contato em breve.`}
        onClose={() => {
          setModalVisible(false);
          navigation.goBack();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
});
